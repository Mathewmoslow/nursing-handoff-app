import Foundation
import SwiftUI

// MARK: - Patient Model
struct Patient: Identifiable, Codable {
    let id = UUID()
    var name: String = ""
    var room: String = ""
    var age: String = ""
    var mrn: String = ""
    var code: String = "Full Code"
    var allergies: [String] = []
    var provider: String = ""
    var diagnosis: String = ""
    var vitals: [String: String] = [:]
    var labs: [String: String] = [:]
    var medications: [String] = []
    var lastUpdate: Date = Date()
}

// MARK: - Assessment Item
struct AssessmentItem: Identifiable {
    let id = UUID()
    let label: String
    let icon: String
    let options: [String]
}

// MARK: - Assessment Data
struct AssessmentItems {
    static let neuro = [
        AssessmentItem(label: "A&O x3", icon: "brain", options: ["A&O x3", "A&O x2", "A&O x1", "Confused"]),
        AssessmentItem(label: "Pupils", icon: "eye", options: ["PERRL", "Sluggish", "Fixed"]),
        AssessmentItem(label: "Movement", icon: "figure.walk", options: ["MAE", "Weakness", "Paralysis"]),
        AssessmentItem(label: "Behavior", icon: "person.2", options: ["Appropriate", "Agitated", "Sedated"]),
        AssessmentItem(label: "Mood", icon: "face.smiling", options: ["Stable", "Anxious", "Depressed"])
    ]
    
    static let cardiac = [
        AssessmentItem(label: "Tele", icon: "waveform.path.ecg", options: ["SR", "AFib", "VTach"]),
        AssessmentItem(label: "Edema", icon: "drop.triangle", options: ["None", "+1", "+2", "+3"]),
        AssessmentItem(label: "CP", icon: "heart", options: ["No CP", "Chest Pain", "Pressure"])
    ]
    
    static let respiratory = [
        AssessmentItem(label: "O2", icon: "wind", options: ["RA", "NC 2L", "NC 4L", "Mask"]),
        AssessmentItem(label: "Lungs", icon: "lungs", options: ["Clear", "Diminished", "Crackles", "Wheezes"]),
        AssessmentItem(label: "Cough", icon: "mouth", options: ["None", "Dry", "Productive"])
    ]
    
    static let gi = [
        AssessmentItem(label: "Diet", icon: "fork.knife", options: ["Regular", "Cardiac", "Diabetic", "NPO"]),
        AssessmentItem(label: "Abdomen", icon: "circle", options: ["Soft", "Firm", "Distended", "Tender"]),
        AssessmentItem(label: "BM", icon: "toilet", options: ["Normal", "Constipated", "Diarrhea"])
    ]
    
    static let gu = [
        AssessmentItem(label: "Urine", icon: "drop", options: ["Continent", "Incontinent", "Anuric"]),
        AssessmentItem(label: "Foley", icon: "circle.slash", options: ["No Foley", "Foley", "Condom Cath"]),
        AssessmentItem(label: "Output", icon: "chart.bar", options: ["Adequate", "Low", "High"])
    ]
    
    static let skin = [
        AssessmentItem(label: "Skin", icon: "bandage", options: ["Intact", "Breakdown", "Rash"]),
        AssessmentItem(label: "Wounds", icon: "cross.case", options: ["None", "Surgical", "Pressure", "Trauma"]),
        AssessmentItem(label: "Braden", icon: "shield", options: ["Low Risk", "Moderate Risk", "High Risk"])
    ]
    
    static let pain = [
        AssessmentItem(label: "Pain Scale", icon: "gauge", options: ["0", "1-3", "4-6", "7-10"]),
        AssessmentItem(label: "Location", icon: "location", options: ["None", "Chest", "Abdomen", "Back", "Extremity"]),
        AssessmentItem(label: "Pain Meds", icon: "pills", options: ["None", "PRN", "Scheduled", "PCA"])
    ]
    
    static let precautions = [
        AssessmentItem(label: "Isolation", icon: "shield", options: ["Standard", "Contact", "Droplet", "Airborne"]),
        AssessmentItem(label: "Safety", icon: "exclamationmark.triangle", options: ["None", "Fall Risk", "Seizure", "Aspiration"]),
        AssessmentItem(label: "Activity", icon: "figure.walk", options: ["Ad Lib", "Bed Rest", "Chair", "Assist x1", "Assist x2"])
    ]
    
    static let iv = [
        AssessmentItem(label: "Fluids", icon: "drop.circle", options: ["None", "NS", "LR", "D5W"]),
        AssessmentItem(label: "IV Meds", icon: "syringe", options: ["None", "Antibiotics", "Cardiac", "Pain"]),
        AssessmentItem(label: "Access", icon: "arrow.right.circle", options: ["PIV", "Central", "PICC", "Port"])
    ]
    
    static let drains = [
        AssessmentItem(label: "Drains", icon: "arrow.down.circle", options: ["None", "JP", "Hemovac", "Chest Tube"]),
        AssessmentItem(label: "Devices", icon: "cpu", options: ["None", "Pacemaker", "AICD", "VAD"]),
        AssessmentItem(label: "Tubes", icon: "rectangle.portrait", options: ["None", "NG", "PEG", "Trach"])
    ]
}

// MARK: - Selected Item
struct SelectedItem: Codable {
    let category: String
    let section: String
    let item: String
    let timestamp: Date
    var note: String?
}

// MARK: - Timeline Event
struct TimelineEvent: Identifiable, Codable {
    let id = UUID()
    let timestamp: Date
    let category: String
    let action: String
    let details: String?
}

// MARK: - Color Extensions
extension Color {
    static let neuroColor = Color.purple
    static let cardiacColor = Color.red
    static let respColor = Color.cyan
    static let giColor = Color.orange
    static let guColor = Color.green
    static let skinColor = Color.pink
    static let painColor = Color(red: 1.0, green: 0.6, blue: 0.2)
    static let precautionsColor = Color.red
    static let ivColor = Color.blue
    static let drainsColor = Color.indigo
}