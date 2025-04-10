package com.voyagewatch.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@Document(collection = "events")
public class Event {
    @Id
    private String id;
    
    private EventType eventType;
    private double latitude;
    private double longitude;
    private String description;
    private String reportedBy;
    private LocalDateTime reportedAt;
    private LocalDateTime expiresAt;
    private boolean isPvP;
    private String allianceId; // Optional, for alliance-specific events
    private int confidence; // 1-5 scale for event reliability
    
    // Additional metadata
    private String serverRegion;
    private String additionalNotes;
    private int upvotes;
    private int downvotes;
} 