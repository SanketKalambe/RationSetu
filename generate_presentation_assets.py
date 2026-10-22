import matplotlib.pyplot as plt
import matplotlib.patches as patches
import os

output_dir = r"C:\Users\DELL\.gemini\antigravity\scratch\smart-pds"

def create_block_diagram(filename=os.path.join(output_dir, "proposed_block_diagram.png")):
    fig, ax = plt.subplots(figsize=(14, 7.8), dpi=300)
    ax.set_xlim(0, 14)
    ax.set_ylim(0, 8.5)
    ax.axis('off')

    fig.patch.set_facecolor('#F8FAFC')
    ax.set_facecolor('#F8FAFC')

    title_box = patches.FancyBboxPatch((0.5, 7.6), 13, 0.7, boxstyle="round,pad=0.1,rounding_size=0.15",
                                       facecolor='#1E3A8A', edgecolor='#172554', linewidth=1.5)
    ax.add_patch(title_box)
    ax.text(7, 7.95, "PROPOSED SYSTEM ARCHITECTURE & BLOCK DIAGRAM (RATIONSETU)",
            color='white', fontsize=14, fontweight='bold', ha='center', va='center')

    # Tier 1
    t1 = patches.FancyBboxPatch((0.5, 4.3), 3.8, 3.0, boxstyle="round,pad=0.15,rounding_size=0.2",
                                facecolor='#EFF6FF', edgecolor='#3B82F6', linewidth=2)
    ax.add_patch(t1)
    ax.text(2.4, 7.0, "1. BENEFICIARY INTERFACE", color='#1E40AF', fontsize=11, fontweight='bold', ha='center')
    
    b1 = patches.FancyBboxPatch((0.8, 6.0), 3.2, 0.7, boxstyle="round,pad=0.1", facecolor='white', edgecolor='#93C5FD')
    ax.add_patch(b1)
    ax.text(2.4, 6.35, "Digital Ration Book (Web/Mobile)\nAAY / BPL / APL Quota Ledger", fontsize=8.5, ha='center', va='center', color='#1E293B')

    b2 = patches.FancyBboxPatch((0.8, 5.1), 3.2, 0.7, boxstyle="round,pad=0.1", facecolor='white', edgecolor='#93C5FD')
    ax.add_patch(b2)
    ax.text(2.4, 5.45, "Slot Booking System\nAtomic Capacity Enforced", fontsize=8.5, ha='center', va='center', color='#1E293B')

    b3 = patches.FancyBboxPatch((0.8, 4.5), 3.2, 0.5, boxstyle="round,pad=0.1", facecolor='white', edgecolor='#93C5FD')
    ax.add_patch(b3)
    ax.text(2.4, 4.75, "Citizen Grievance & Chatbox", fontsize=8.5, ha='center', va='center', color='#1E293B')

    # Tier 2
    t2 = patches.FancyBboxPatch((4.8, 4.3), 4.4, 3.0, boxstyle="round,pad=0.15,rounding_size=0.2",
                                facecolor='#F0FDF4', edgecolor='#22C55E', linewidth=2)
    ax.add_patch(t2)
    ax.text(7.0, 7.0, "2. FAIR PRICE SHOP (FPS) e-POS TIER", color='#166534', fontsize=11, fontweight='bold', ha='center')

    e1 = patches.FancyBboxPatch((5.1, 6.1), 3.8, 0.65, boxstyle="round,pad=0.1", facecolor='white', edgecolor='#86EFAC')
    ax.add_patch(e1)
    ax.text(7.0, 6.42, "Biometric Fingerprint Sensor\n(Optical & WebAuthn / Aadhaar Verification)", fontsize=8, ha='center', va='center', color='#1E293B')

    e2 = patches.FancyBboxPatch((5.1, 5.3), 3.8, 0.65, boxstyle="round,pad=0.1", facecolor='white', edgecolor='#86EFAC')
    ax.add_patch(e2)
    ax.text(7.0, 5.62, "Smart e-POS State Machine\n5-Step Hardware Automation Engine", fontsize=8.5, ha='center', va='center', color='#1E293B')

    e3 = patches.FancyBboxPatch((5.1, 4.5), 3.8, 0.65, boxstyle="round,pad=0.1", facecolor='white', edgecolor='#86EFAC')
    ax.add_patch(e3)
    ax.text(7.0, 4.82, "Electronic Scale & Receipt Generator\nQR Code Digitally Signed Bills", fontsize=8.5, ha='center', va='center', color='#1E293B')

    # Tier 3
    t3 = patches.FancyBboxPatch((9.7, 4.3), 3.8, 3.0, boxstyle="round,pad=0.15,rounding_size=0.2",
                                facecolor='#FEF3C7', edgecolor='#F59E0B', linewidth=2)
    ax.add_patch(t3)
    ax.text(11.6, 7.0, "3. SECURITY & SERVICE LAYER", color='#92400E', fontsize=11, fontweight='bold', ha='center')

    s1 = patches.FancyBboxPatch((10.0, 6.1), 3.2, 0.65, boxstyle="round,pad=0.1", facecolor='white', edgecolor='#FDE68A')
    ax.add_patch(s1)
    ax.text(11.6, 6.42, "AES-256-CBC Field Encryption\nAadhaar Privacy & Masking Module", fontsize=8.5, ha='center', va='center', color='#1E293B')

    s2 = patches.FancyBboxPatch((10.0, 5.3), 3.2, 0.65, boxstyle="round,pad=0.1", facecolor='white', edgecolor='#FDE68A')
    ax.add_patch(s2)
    ax.text(11.6, 5.62, "Dynamic Quota Calculation Engine\nZero-Cron Monthly Reset Algorithm", fontsize=8.5, ha='center', va='center', color='#1E293B')

    s3 = patches.FancyBboxPatch((10.0, 4.5), 3.2, 0.65, boxstyle="round,pad=0.1", facecolor='white', edgecolor='#FDE68A')
    ax.add_patch(s3)
    ax.text(11.6, 4.82, "Role-Based Access Control (RBAC)\nJWT Token Authentication Pipeline", fontsize=8.5, ha='center', va='center', color='#1E293B')

    # Tier 4
    t4 = patches.FancyBboxPatch((0.5, 0.5), 13.0, 3.2, boxstyle="round,pad=0.15,rounding_size=0.2",
                                facecolor='#F3E8FF', edgecolor='#9333EA', linewidth=2)
    ax.add_patch(t4)
    ax.text(7.0, 3.35, "4. CENTRAL GOVERNMENT GOVERNANCE & PERSISTENCE TIER", color='#6B21A8', fontsize=11, fontweight='bold', ha='center')

    d1 = patches.FancyBboxPatch((0.8, 1.0), 3.6, 2.0, boxstyle="round,pad=0.1", facecolor='white', edgecolor='#D8B4FE')
    ax.add_patch(d1)
    ax.text(2.6, 2.7, "MongoDB Persistence Engine", fontsize=10, fontweight='bold', color='#6B21A8', ha='center')
    ax.text(2.6, 1.8, "• Citizen & Family Schemas\n• Encrypted Aadhaar Vault\n• FPS Inventory Collection\n• Atomic Slot Allocations\n• Audit Ledger (Transactions)", fontsize=8, color='#334155', ha='center')

    d2 = patches.FancyBboxPatch((4.9, 1.0), 4.2, 2.0, boxstyle="round,pad=0.1", facecolor='white', edgecolor='#D8B4FE')
    ax.add_patch(d2)
    ax.text(7.0, 2.7, "Government Administration Suite", fontsize=10, fontweight='bold', color='#6B21A8', ha='center')
    ax.text(7.0, 1.8, "• KYC Verification Queue & Approvals\n• District-Wise Stock Allocation\n• Black-Market & Diversion Monitoring\n• Real-Time Supply Chain Auditing\n• Toll-Free Helpline Configuration", fontsize=8, color='#334155', ha='center')

    d3 = patches.FancyBboxPatch((9.6, 1.0), 3.6, 2.0, boxstyle="round,pad=0.1", facecolor='white', edgecolor='#D8B4FE')
    ax.add_patch(d3)
    ax.text(11.4, 2.7, "Payment & External Integrations", fontsize=10, fontweight='bold', color='#6B21A8', ha='center')
    ax.text(11.4, 1.8, "• Razorpay Sandbox Gateway\n• Digital Thermal Printer Output\n• Mock UIDAI & PDS Registry\n• Cloudinary Evidence Storage\n• Real-Time Analytics Charts", fontsize=8, color='#334155', ha='center')

    # Connecting Arrows
    arrow_props = dict(arrowstyle="<->", color='#475569', lw=2, mutation_scale=15)
    ax.annotate("", xy=(4.3, 5.8), xytext=(4.8, 5.8), arrowprops=arrow_props)
    ax.annotate("", xy=(9.2, 5.8), xytext=(9.7, 5.8), arrowprops=arrow_props)
    ax.annotate("", xy=(2.4, 4.3), xytext=(2.4, 3.7), arrowprops=arrow_props)
    ax.annotate("", xy=(7.0, 4.3), xytext=(7.0, 3.7), arrowprops=arrow_props)
    ax.annotate("", xy=(11.6, 4.3), xytext=(11.6, 3.7), arrowprops=arrow_props)

    plt.tight_layout()
    plt.savefig(filename, dpi=300, facecolor=fig.get_facecolor(), edgecolor='none')
    plt.close()
    print(f"Created {filename}")

def create_methodology_flowchart(filename=os.path.join(output_dir, "methodology_flowchart.png")):
    fig, ax = plt.subplots(figsize=(14, 6.5), dpi=300)
    ax.set_xlim(0, 14)
    ax.set_ylim(0, 7)
    ax.axis('off')

    fig.patch.set_facecolor('#F8FAFC')
    ax.set_facecolor('#F8FAFC')

    title_box = patches.FancyBboxPatch((0.5, 6.2), 13, 0.65, boxstyle="round,pad=0.1,rounding_size=0.15",
                                       facecolor='#0F172A', edgecolor='#020617', linewidth=1.5)
    ax.add_patch(title_box)
    ax.text(7, 6.52, "RESEARCH METHODOLOGY WORKFLOW PHASES (RATIONSETU)",
            color='white', fontsize=13, fontweight='bold', ha='center', va='center')

    phases = [
        ("Phase 1: Problem Definition\n& Literature Survey", 
         "• Identify PDS leakages, diversion\n• Study biometric & smart card gaps\n• Formulate research questions",
         "#EFF6FF", "#3B82F6", "#1E40AF"),
        ("Phase 2: Architectural &\nMathematical Modeling",
         "• Event-sourced quota model\n• Atomic concurrency algorithms\n• RBAC security matrix design",
         "#F0FDF4", "#22C55E", "#166534"),
        ("Phase 3: Hardware &\nCryptographic Design",
         "• e-POS 5-step state machine\n• AES-256 field-level encryption\n• Optical/WebAuthn biometric mock",
         "#FEF3C7", "#F59E0B", "#92400E"),
        ("Phase 4: Full-Stack\nPrototype Implementation",
         "• React 18 + Redux Frontend\n• Node/Express REST API\n• MongoDB ACID transactions",
         "#F3E8FF", "#A855F7", "#6B21A8"),
        ("Phase 5: Empirical Testing\n& Validation",
         "• Automated Jest unit suites\n• Concurrency race tests\n• Zero-leakage verification",
         "#ECFDF5", "#10B981", "#065F46")
    ]

    box_width = 2.3
    spacing = 0.35
    start_x = 0.5

    for idx, (p_title, p_desc, bg, border, text_c) in enumerate(phases):
        x = start_x + idx * (box_width + spacing)
        box = patches.FancyBboxPatch((x, 1.2), box_width, 4.4, boxstyle="round,pad=0.1,rounding_size=0.15",
                                     facecolor=bg, edgecolor=border, linewidth=2)
        ax.add_patch(box)

        header = patches.FancyBboxPatch((x + 0.1, 4.3), box_width - 0.2, 1.1, boxstyle="round,pad=0.08,rounding_size=0.1",
                                       facecolor=border, edgecolor=border)
        ax.add_patch(header)
        ax.text(x + box_width / 2, 4.85, p_title, color='white', fontsize=8.5, fontweight='bold', ha='center', va='center')

        ax.text(x + 0.2, 2.8, p_desc, color='#1E293B', fontsize=8, va='center', linespacing=1.6)
        ax.text(x + box_width / 2, 1.5, f"Step 0{idx+1}", color=text_c, fontsize=9, fontweight='bold', ha='center')

        if idx < len(phases) - 1:
            arrow_x = x + box_width + 0.05
            ax.annotate("", xy=(arrow_x + spacing - 0.1, 3.4), xytext=(arrow_x, 3.4),
                        arrowprops=dict(arrowstyle="->", color='#64748B', lw=2.5, mutation_scale=15))

    outcome_box = patches.FancyBboxPatch((0.5, 0.3), 13.0, 0.65, boxstyle="round,pad=0.1,rounding_size=0.1",
                                         facecolor='#E2E8F0', edgecolor='#94A3B8', linewidth=1)
    ax.add_patch(outcome_box)
    ax.text(7, 0.62, "Deliverable: Fully Functional, Scalable, Anti-Diversion Smart PDS Prototype with Research Verification",
            color='#0F172A', fontsize=9.5, fontweight='bold', ha='center', va='center')

    plt.tight_layout()
    plt.savefig(filename, dpi=300, facecolor=fig.get_facecolor(), edgecolor='none')
    plt.close()
    print(f"Created {filename}")

def create_epos_workflow_diagram(filename=os.path.join(output_dir, "epos_workflow_diagram.png")):
    fig, ax = plt.subplots(figsize=(14, 5.5), dpi=300)
    ax.set_xlim(0, 14)
    ax.set_ylim(0, 6)
    ax.axis('off')

    fig.patch.set_facecolor('#F8FAFC')
    ax.set_facecolor('#F8FAFC')

    title_box = patches.FancyBboxPatch((0.5, 5.0), 13, 0.65, boxstyle="round,pad=0.1,rounding_size=0.15",
                                       facecolor='#1E293B', edgecolor='#0F172A', linewidth=1.5)
    ax.add_patch(title_box)
    ax.text(7, 5.32, "5-STEP e-POS SMART TERMINAL OPERATIONAL STATE MACHINE",
            color='white', fontsize=12.5, fontweight='bold', ha='center', va='center')

    steps = [
        ("Step 1: Scan / Query", "Input Ration Card No.\nor scan QR code;\nQuery registry & KYC status.", "#EFF6FF", "#3B82F6"),
        ("Step 2: Biometric Auth", "Select family member;\nAuthenticate via optical/\nWebAuthn fingerprint scan.", "#F0FDF4", "#22C55E"),
        ("Step 3: Quota Check", "Retrieve monthly balance;\nValidate AAY/BPL quota;\nBlock over-dispensation.", "#FEF3C7", "#F59E0B"),
        ("Step 4: Dispensation", "Measure commodity kg;\nVerify against load cell;\nCompute subsidized bill.", "#F3E8FF", "#A855F7"),
        ("Step 5: Digital Receipt", "Generate QR thermal bill;\nUpdate cloud inventory;\nLog immutable audit trail.", "#ECFDF5", "#10B981")
    ]

    box_w = 2.3
    spacing = 0.35
    start_x = 0.5

    for idx, (s_title, s_desc, bg, border) in enumerate(steps):
        x = start_x + idx * (box_w + spacing)
        box = patches.FancyBboxPatch((x, 1.0), box_w, 3.4, boxstyle="round,pad=0.1,rounding_size=0.15",
                                     facecolor=bg, edgecolor=border, linewidth=2)
        ax.add_patch(box)

        h_box = patches.FancyBboxPatch((x + 0.1, 3.4), box_w - 0.2, 0.8, boxstyle="round,pad=0.08,rounding_size=0.1",
                                       facecolor=border, edgecolor=border)
        ax.add_patch(h_box)
        ax.text(x + box_w / 2, 3.8, s_title, color='white', fontsize=9, fontweight='bold', ha='center', va='center')

        ax.text(x + box_w / 2, 2.2, s_desc, color='#1E293B', fontsize=8.5, ha='center', va='center', linespacing=1.5)

        if idx < len(steps) - 1:
            arrow_x = x + box_w + 0.05
            ax.annotate("", xy=(arrow_x + spacing - 0.1, 2.7), xytext=(arrow_x, 2.7),
                        arrowprops=dict(arrowstyle="->", color='#64748B', lw=2.5, mutation_scale=15))

    footer_box = patches.FancyBboxPatch((0.5, 0.2), 13.0, 0.55, boxstyle="round,pad=0.1,rounding_size=0.1",
                                        facecolor='#E2E8F0', edgecolor='#94A3B8', linewidth=1)
    ax.add_patch(footer_box)
    ax.text(7, 0.47, "Strict Hardware State Machine Guarantees 0% Ghost Cards & 100% Anti-Diversion Integrity",
            color='#0F172A', fontsize=9.5, fontweight='bold', ha='center', va='center')

    plt.tight_layout()
    plt.savefig(filename, dpi=300, facecolor=fig.get_facecolor(), edgecolor='none')
    plt.close()
    print(f"Created {filename}")

if __name__ == "__main__":
    create_block_diagram()
    create_methodology_flowchart()
    create_epos_workflow_diagram()
