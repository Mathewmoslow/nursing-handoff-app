import SwiftUI

struct ContentView: View {
    @State private var patients: [Patient] = [Patient()]
    @State private var activePatientIndex = 0
    @State private var selectedItems: Set<String> = []
    @State private var showingSuggestions = false
    @State private var darkMode = false
    
    var currentPatient: Patient {
        patients.indices.contains(activePatientIndex) ? patients[activePatientIndex] : Patient()
    }
    
    var body: some View {
        VStack(spacing: 0) {
            // Patient Tabs with integrated info
            PatientTabsView(
                patients: $patients,
                activePatientIndex: $activePatientIndex,
                darkMode: $darkMode
            )
            
            // Suggestions Bar (collapsible)
            if showingSuggestions {
                SuggestionsBar(
                    selectedItems: $selectedItems
                )
                .transition(.move(edge: .top).combined(with: .opacity))
            }
            
            // Main Grid
            ScrollView {
                VStack(spacing: 8) {
                    // Quick Access Panel
                    QuickAccessPanel(selectedItems: $selectedItems)
                        .frame(height: 180)
                    
                    // Assessment Grid
                    LazyVGrid(columns: [
                        GridItem(.flexible()),
                        GridItem(.flexible())
                    ], spacing: 8) {
                        // Systems Assessment Boxes
                        SystemAssessmentBox(
                            title: "NEURO",
                            color: .purple,
                            items: AssessmentItems.neuro,
                            selectedItems: $selectedItems
                        )
                        
                        SystemAssessmentBox(
                            title: "CARDIAC",
                            color: .red,
                            items: AssessmentItems.cardiac,
                            selectedItems: $selectedItems
                        )
                        
                        SystemAssessmentBox(
                            title: "RESP",
                            color: .cyan,
                            items: AssessmentItems.respiratory,
                            selectedItems: $selectedItems
                        )
                        
                        SystemAssessmentBox(
                            title: "GI",
                            color: .orange,
                            items: AssessmentItems.gi,
                            selectedItems: $selectedItems
                        )
                        
                        SystemAssessmentBox(
                            title: "GU",
                            color: .green,
                            items: AssessmentItems.gu,
                            selectedItems: $selectedItems
                        )
                        
                        SystemAssessmentBox(
                            title: "SKIN/WOUNDS",
                            color: .pink,
                            items: AssessmentItems.skin,
                            selectedItems: $selectedItems
                        )
                    }
                    
                    // Vitals Grid
                    VitalsGrid(patient: patients[activePatientIndex])
                        .frame(height: 200)
                    
                    // Labs Grid
                    LabsGrid(patient: patients[activePatientIndex])
                        .frame(height: 200)
                    
                    // Additional sections
                    LazyVGrid(columns: [
                        GridItem(.flexible()),
                        GridItem(.flexible())
                    ], spacing: 8) {
                        SystemAssessmentBox(
                            title: "PAIN",
                            color: .orange,
                            items: AssessmentItems.pain,
                            selectedItems: $selectedItems
                        )
                        
                        SystemAssessmentBox(
                            title: "PRECAUTIONS",
                            color: .red,
                            items: AssessmentItems.precautions,
                            selectedItems: $selectedItems
                        )
                        
                        SystemAssessmentBox(
                            title: "IV",
                            color: .blue,
                            items: AssessmentItems.iv,
                            selectedItems: $selectedItems
                        )
                        
                        SystemAssessmentBox(
                            title: "DRAINS/DEVICES",
                            color: .indigo,
                            items: AssessmentItems.drains,
                            selectedItems: $selectedItems
                        )
                    }
                }
                .padding(8)
            }
        }
        .preferredColorScheme(darkMode ? .dark : .light)
    }
}

// MARK: - Patient Tabs View
struct PatientTabsView: View {
    @Binding var patients: [Patient]
    @Binding var activePatientIndex: Int
    @Binding var darkMode: Bool
    
    var body: some View {
        HStack {
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 4) {
                    ForEach(patients.indices, id: \.self) { index in
                        PatientTab(
                            patient: patients[index],
                            isActive: activePatientIndex == index,
                            onTap: { activePatientIndex = index }
                        )
                    }
                    
                    // Add Patient Button
                    Button(action: {
                        patients.append(Patient())
                        activePatientIndex = patients.count - 1
                    }) {
                        Image(systemName: "plus")
                            .foregroundColor(.blue)
                            .frame(width: 40, height: 40)
                            .background(Color.gray.opacity(0.2))
                            .cornerRadius(8)
                    }
                }
                .padding(.horizontal)
            }
            
            Spacer()
            
            // Action buttons
            HStack(spacing: 8) {
                Button(action: { darkMode.toggle() }) {
                    Image(systemName: darkMode ? "sun.max" : "moon")
                }
                Button(action: { /* Print */ }) {
                    Image(systemName: "printer")
                }
                Button(action: { /* Export */ }) {
                    Image(systemName: "square.and.arrow.up")
                }
            }
            .padding(.trailing)
        }
        .frame(height: 60)
        .background(Color(UIColor.systemBackground))
        .shadow(radius: 2)
    }
}

// MARK: - Patient Tab
struct PatientTab: View {
    let patient: Patient
    let isActive: Bool
    let onTap: () -> Void
    
    var body: some View {
        Button(action: onTap) {
            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    Text(patient.room.isEmpty ? "Room" : patient.room)
                        .font(.caption)
                        .fontWeight(.bold)
                    Text(patient.name.isEmpty ? "Patient" : patient.name)
                        .font(.caption2)
                }
                
                if isActive {
                    Divider()
                        .frame(height: 20)
                    
                    // Patient info in active tab
                    HStack(spacing: 8) {
                        if !patient.age.isEmpty {
                            Text(patient.age)
                                .font(.caption2)
                        }
                        
                        Text(patient.code)
                            .font(.caption2)
                            .padding(.horizontal, 4)
                            .background(patient.code == "DNR" ? Color.red : Color.green)
                            .cornerRadius(4)
                        
                        HStack(spacing: 2) {
                            Image(systemName: "exclamationmark.triangle")
                                .font(.caption2)
                                .foregroundColor(.orange)
                            Text(patient.allergies.isEmpty ? "NKDA" : patient.allergies.joined(separator: ", "))
                                .font(.caption2)
                                .lineLimit(1)
                        }
                    }
                }
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 8)
            .background(isActive ? Color.blue : Color.gray.opacity(0.2))
            .foregroundColor(isActive ? .white : .primary)
            .cornerRadius(8)
        }
    }
}

// MARK: - Quick Access Panel
struct QuickAccessPanel: View {
    @Binding var selectedItems: Set<String>
    
    let quickItems = [
        ("A&O x3", "neuro"),
        ("SR", "cardiac"),
        ("Clear", "respiratory"),
        ("Soft", "gi"),
        ("Continent", "gu"),
        ("Intact", "skin"),
        ("Full Code", "precautions"),
        ("PIV", "iv"),
        ("Foley", "drains")
    ]
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("QUICK ACCESS")
                .font(.caption)
                .fontWeight(.bold)
                .foregroundColor(.secondary)
            
            LazyVGrid(columns: [
                GridItem(.flexible()),
                GridItem(.flexible()),
                GridItem(.flexible())
            ], spacing: 8) {
                ForEach(quickItems, id: \.0) { item in
                    Button(action: {
                        if selectedItems.contains(item.0) {
                            selectedItems.remove(item.0)
                        } else {
                            selectedItems.insert(item.0)
                        }
                    }) {
                        Text(item.0)
                            .font(.caption)
                            .padding(.vertical, 8)
                            .frame(maxWidth: .infinity)
                            .background(selectedItems.contains(item.0) ? Color.green : Color.gray.opacity(0.2))
                            .foregroundColor(selectedItems.contains(item.0) ? .white : .primary)
                            .cornerRadius(8)
                    }
                }
            }
        }
        .padding()
        .background(Color(UIColor.secondarySystemBackground))
        .cornerRadius(12)
    }
}

// MARK: - System Assessment Box
struct SystemAssessmentBox: View {
    let title: String
    let color: Color
    let items: [AssessmentItem]
    @Binding var selectedItems: Set<String>
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .font(.caption)
                .fontWeight(.bold)
                .foregroundColor(.white)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 4)
                .background(color)
            
            VStack(spacing: 4) {
                ForEach(items) { item in
                    AssessmentButton(
                        item: item,
                        isSelected: selectedItems.contains(item.label),
                        action: {
                            if selectedItems.contains(item.label) {
                                selectedItems.remove(item.label)
                            } else {
                                selectedItems.insert(item.label)
                            }
                        }
                    )
                }
            }
            .padding(8)
        }
        .background(Color(UIColor.secondarySystemBackground))
        .cornerRadius(12)
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(color, lineWidth: 2)
        )
    }
}

// MARK: - Assessment Button
struct AssessmentButton: View {
    let item: AssessmentItem
    let isSelected: Bool
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            HStack {
                Image(systemName: item.icon)
                    .font(.caption)
                Text(item.label)
                    .font(.caption)
                Spacer()
                if isSelected {
                    Image(systemName: "checkmark.circle.fill")
                        .foregroundColor(.green)
                        .font(.caption)
                }
            }
            .padding(.vertical, 4)
            .padding(.horizontal, 8)
            .background(isSelected ? Color.green.opacity(0.2) : Color.clear)
            .cornerRadius(6)
        }
        .buttonStyle(PlainButtonStyle())
    }
}

// MARK: - Suggestions Bar
struct SuggestionsBar: View {
    @Binding var selectedItems: Set<String>
    
    var body: some View {
        HStack {
            Image(systemName: "lightbulb")
                .foregroundColor(.orange)
            
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 8) {
                    ForEach(["O2", "Telemetry", "Fall Risk", "NPO", "Aspiration"], id: \.self) { suggestion in
                        Button(action: {
                            selectedItems.insert(suggestion)
                        }) {
                            Text(suggestion)
                                .font(.caption)
                                .padding(.horizontal, 12)
                                .padding(.vertical, 4)
                                .background(Color.orange.opacity(0.2))
                                .cornerRadius(12)
                        }
                    }
                }
            }
        }
        .padding()
        .background(Color.yellow.opacity(0.2))
        .cornerRadius(8)
    }
}

// MARK: - Vitals Grid
struct VitalsGrid: View {
    let patient: Patient
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("VITALS")
                .font(.caption)
                .fontWeight(.bold)
                .foregroundColor(.secondary)
            
            // Vitals grid implementation
            Text("Vitals data grid here")
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .background(Color(UIColor.secondarySystemBackground))
                .cornerRadius(8)
        }
    }
}

// MARK: - Labs Grid
struct LabsGrid: View {
    let patient: Patient
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("LABS")
                .font(.caption)
                .fontWeight(.bold)
                .foregroundColor(.secondary)
            
            // Labs grid implementation
            Text("Labs data grid here")
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .background(Color(UIColor.secondarySystemBackground))
                .cornerRadius(8)
        }
    }
}

#Preview {
    ContentView()
}