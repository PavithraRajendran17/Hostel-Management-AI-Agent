package com.hostel.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class AIService {
    
    @Value("${gemini.api.key}")
    private String geminiApiKey;
    
    @Value("${gemini.api.url}")
    private String geminiApiUrl;
    
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    
    public AIService() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }
    
    /**
     * Parse natural language input to detect intent and extract parameters
     * 
     * @param userInput Natural language input from student
     * @return Map containing intent and extracted parameters
     */
    public Map<String, Object> parseUserInput(String userInput) {
        try {
            String prompt = buildPrompt(userInput);
            String response = callGeminiAPI(prompt);
            return parseResponse(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to parse input: " + e.getMessage());
            errorResponse.put("intent", "UNKNOWN");
            return errorResponse;
        }
    }
    
    /**
     * Build the prompt for Gemini API
     */
    private String buildPrompt(String userInput) {
        return String.format(
            "You are an AI assistant for a hostel management system. Analyze the following student message and extract the intent and parameters.\n\n" +
            "Student Message: \"%s\"\n\n" +
            "Possible intents:\n" +
            "1. COMPLAINT - Student is reporting an issue/complaint\n" +
            "2. LEAVE_REQUEST - Student is requesting leave\n" +
            "3. QUERY - Student is asking for information\n" +
            "4. UNKNOWN - Cannot determine intent\n\n" +
            "For COMPLAINT, extract:\n" +
            "- details: Full description of the complaint\n" +
            "- category: One of [MAINTENANCE, ELECTRICAL, PLUMBING, CLEANING, SECURITY, FOOD, OTHER]\n" +
            "- priority: One of [LOW, MEDIUM, HIGH, URGENT]\n\n" +
            "For LEAVE_REQUEST, extract:\n" +
            "- reason: Reason for leave\n" +
            "- start_date: Start date in YYYY-MM-DD format\n" +
            "- end_date: End date in YYYY-MM-DD format\n\n" +
            "Respond with ONLY a JSON object in this exact format:\n" +
            "{\n" +
            "  \"intent\": \"COMPLAINT|LEAVE_REQUEST|QUERY|UNKNOWN\",\n" +
            "  \"details\": \"extracted details or reason\",\n" +
            "  \"category\": \"category if applicable\",\n" +
            "  \"priority\": \"priority if applicable\",\n" +
            "  \"start_date\": \"YYYY-MM-DD if applicable\",\n" +
            "  \"end_date\": \"YYYY-MM-DD if applicable\",\n" +
            "  \"confidence\": 0.0-1.0\n" +
            "}\n\n" +
            "Do not include any additional text or explanation.",
            userInput
        );
    }
    
    /**
     * Call Gemini API with the prompt
     */
    private String callGeminiAPI(String prompt) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            Map<String, Object> requestBody = new HashMap<>();
            Map<String, String> content = new HashMap<>();
            content.put("parts", "[{\"text\": \"" + prompt.replace("\"", "\\\"") + "\"}]");
            requestBody.put("contents", new Object[]{content});
            
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            
            String url = geminiApiUrl + "?key=" + geminiApiKey;
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
            
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                return extractTextFromResponse(response.getBody());
            }
            
            throw new RuntimeException("Gemini API returned error: " + response.getStatusCode());
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to call Gemini API: " + e.getMessage(), e);
        }
    }
    
    /**
     * Extract the actual text content from Gemini API response
     */
    private String extractTextFromResponse(String responseBody) {
        try {
            JsonNode root = objectMapper.readTree(responseBody);
            JsonNode candidates = root.path("candidates");
            if (candidates.isArray() && candidates.size() > 0) {
                JsonNode content = candidates.get(0).path("content");
                JsonNode parts = content.path("parts");
                if (parts.isArray() && parts.size() > 0) {
                    return parts.get(0).path("text").asText();
                }
            }
            throw new RuntimeException("Could not extract text from Gemini response");
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse Gemini response: " + e.getMessage(), e);
        }
    }
    
    /**
     * Parse the JSON response from Gemini
     */
    private Map<String, Object> parseResponse(String jsonResponse) {
        try {
            JsonNode root = objectMapper.readTree(jsonResponse);
            Map<String, Object> result = new HashMap<>();
            
            result.put("intent", root.path("intent").asText("UNKNOWN"));
            result.put("details", root.path("details").asText(""));
            result.put("category", root.path("category").asText(null));
            result.put("priority", root.path("priority").asText("MEDIUM"));
            result.put("start_date", root.path("start_date").asText(null));
            result.put("end_date", root.path("end_date").asText(null));
            result.put("confidence", root.path("confidence").asDouble(0.0));
            
            return result;
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to parse AI response: " + e.getMessage());
            errorResponse.put("intent", "UNKNOWN");
            return errorResponse;
        }
    }
    
    /**
     * Validate extracted parameters for a complaint
     */
    public boolean validateComplaintParams(Map<String, Object> params) {
        String intent = (String) params.get("intent");
        if (!"COMPLAINT".equals(intent)) {
            return false;
        }
        
        String details = (String) params.get("details");
        String category = (String) params.get("category");
        String priority = (String) params.get("priority");
        
        return details != null && !details.isEmpty() &&
               category != null && !category.isEmpty() &&
               priority != null && !priority.isEmpty();
    }
    
    /**
     * Validate extracted parameters for a leave request
     */
    public boolean validateLeaveRequestParams(Map<String, Object> params) {
        String intent = (String) params.get("intent");
        if (!"LEAVE_REQUEST".equals(intent)) {
            return false;
        }
        
        String reason = (String) params.get("reason");
        String startDate = (String) params.get("start_date");
        String endDate = (String) params.get("end_date");
        
        return reason != null && !reason.isEmpty() &&
               startDate != null && !startDate.isEmpty() &&
               endDate != null && !endDate.isEmpty();
    }
}
