/* ============================================================
   EMC Aviation Commerce Platform — Modules Data & Renderer
   Single source of truth for module detail views based on PDD v2.0
   ============================================================ */

   const M = {
    commercial: {
      title: "Commercial Management",
      pillar: "Commercial Pillar",
      eyebrow: "Commercial Management",
      lead: "Serves as the commercial foundation of the airline cargo business by enabling airlines to manage customers, products, inquiries, contracts and pricing strategies through a centralized platform.",
      metaTitle: "Air Cargo Rate & Contract Management",
      metaDescription: "Manage airline cargo customers, contracts, rates and quotations on a single platform, with spot pricing, credit control and customer performance analytics.",
      overview: "Commercial Management serves as the commercial foundation of the airline cargo business by enabling airlines to manage customers, products, inquiries, contracts and pricing strategies through a centralized platform. The module standardizes commercial activities across all sales channels while ensuring freight forwarders, GSAs and strategic customers operate using consistent commercial rules. Commercial teams can rapidly respond to market opportunities, generate quotations and maximize cargo revenue while maintaining complete visibility into customer relationships and pricing structures.",
      benefits: [
        "Improved customer engagement",
        "Faster quote turnaround",
        "Better pricing consistency",
        "Reduced revenue leakage",
        "Increased revenue opportunities"
      ],
      capabilities: [
        { name: "Customer Management", desc: "Maintain a unified view of shippers, forwarders and partners. Centralize profiles, hierarchies, contacts and commercial preferences." },
        { name: "Product Catalogue", desc: "Define service products and special handling offerings in one place. Standardize what each customer segment can buy across channels." },
        { name: "Inquiry Management", desc: "Capture and track commercial inquiries from initial request to response. Ensure sales teams act consistently and transparently across markets." },
        { name: "Contract Management", desc: "Manage customer agreements, service entitlements and commercial commitments. Keep negotiated terms visible throughout the booking lifecycle." },
        { name: "Rate Management", desc: "Configure tariffs, market rates and customer-specific pricing rules. Improve pricing governance while responding faster to market changes." },
        { name: "Spot Pricing", desc: "Support tactical pricing for ad hoc opportunities and urgent shipments. Enable commercial teams to protect yield while staying competitive." },
        { name: "Quote Management", desc: "Generate structured quotations with validity, terms and service conditions. Give customers clear commercial proposals with full auditability." },
        { name: "Credit Management", desc: "Monitor credit limits, payment exposure and approval needs. Reduce financial risk before bookings and shipment execution." },
        { name: "Customer Performance Analytics", desc: "Measure customer revenue, contribution and service behavior. Identify profitable accounts, growth opportunities and exception patterns." }
      ]
    },
  
    capacity: {
      title: "Capacity & Network Management",
      pillar: "Commercial Pillar",
      eyebrow: "Capacity & Network Management",
      lead: "Enables airlines to maximize aircraft utilization while balancing demand, capacity and profitability across the airline network.",
      metaTitle: "Air Cargo Capacity Management Software",
      metaDescription: "Allocate and forecast air cargo capacity across routes, flights and partners, with block space agreements, overbooking rules and route profitability analysis.",
      overview: "Capacity & Network Management enables airlines to maximize aircraft utilization while balancing demand, capacity and profitability across the airline network. The module provides visibility into available cargo space and allows airlines to strategically allocate capacity across customers, routes and partners.",
      benefits: [
        "Increased load factors",
        "Improved aircraft utilization",
        "Better route profitability",
        "Improved demand forecasting"
      ],
      capabilities: [
        { name: "Flight Schedule Management", desc: "Maintain cargo-relevant schedules, frequencies and routing structures. Keep operational planning aligned with commercial availability." },
        { name: "Capacity Allocation", desc: "Assign capacity by route, flight, customer or product strategy. Support disciplined space control across the network." },
        { name: "Capacity Reservations", desc: "Reserve inventory for key customers, products or strategic commitments. Protect high-value demand before general release." },
        { name: "Block Space Agreements", desc: "Manage contracted allotments with partners and customers. Track committed space against actual usage and performance." },
        { name: "Capacity Forecasting", desc: "Project demand and available space using route and seasonal patterns. Improve planning quality for both sales and operations." },
        { name: "Overbooking Management", desc: "Configure overbooking rules to balance spoilage risk and demand variability. Optimize utilization without losing operational control." },
        { name: "Route Profitability Analysis", desc: "Compare revenue opportunity, utilization and contribution by lane. Support smarter network and pricing decisions." },
        { name: "Seasonal Planning", desc: "Plan for peak seasons, market shifts and special movements. Rebalance capacity strategies before demand pressure occurs." }
      ]
    },
  
    booking: {
      title: "Booking Management",
      pillar: "Commercial Pillar",
      eyebrow: "Booking Management",
      lead: "Digitizes and automates the complete booking lifecycle from initial request through confirmation and execution.",
      metaTitle: "Air Cargo Booking Software",
      metaDescription: "Digitize the air cargo booking lifecycle from request to confirmation, with automated validation, approvals, prioritization, amendments and waitlist management.",
      overview: "Booking Management digitizes and automates the complete booking lifecycle from initial request through confirmation and execution. The module supports multiple booking channels and configurable business rules to validate capacity, prioritize customers and streamline approvals.",
      benefits: [
        "Faster booking cycles",
        "Improved customer experience",
        "Better capacity utilization",
        "Reduced manual intervention"
      ],
      capabilities: [
        { name: "Booking Creation", desc: "Capture booking requests consistently across digital and assisted channels. Standardize required data before execution begins." },
        { name: "Booking Validation", desc: "Validate product, routing, shipment attributes and business rules automatically. Improve booking quality before confirmation." },
        { name: "Booking Approvals", desc: "Route exceptions and policy-driven cases for rapid approval. Maintain governance without slowing commercial responsiveness." },
        { name: "Booking Prioritization", desc: "Prioritize demand based on value, commitments and service strategy. Allocate constrained space with greater commercial discipline." },
        { name: "Booking Amendments", desc: "Manage changes to shipment details, routing and capacity needs. Keep all stakeholders aligned on the latest booking version." },
        { name: "Booking Cancellation", desc: "Handle cancellations with traceability and configurable rules. Free up capacity quickly for alternate demand." },
        { name: "Waitlist Management", desc: "Track unconfirmed demand and promote bookings when capacity opens. Improve fill rates while preserving transparency." },
        { name: "Exception Handling", desc: "Surface incomplete, conflicting or high-risk cases for intervention. Reduce manual firefighting with structured workflows." }
      ]
    },
  
    awb: {
      title: "Shipment & Air Waybill Management",
      pillar: "Operational Pillar",
      eyebrow: "Shipment & Air Waybill Management",
      lead: "Provides complete control over the shipment documentation lifecycle while establishing a single source of truth for every cargo movement across the airline network.",
      metaTitle: "e-AWB & Air Waybill Management Software",
      metaDescription: "Control the air waybill lifecycle end to end: AWB stock and issuance, e-AWB, consolidations, split shipments, milestone tracking and documentation audit checks.",
      overview: "Shipment & Air Waybill Management provides complete control over the shipment documentation lifecycle while establishing a single source of truth for every cargo movement across the airline network.",
      benefits: [
        "Improved shipment visibility",
        "Reduced documentation errors",
        "Faster processing",
        "Improved customer communication"
      ],
      capabilities: [
        { name: "AWB Stock Control", desc: "Maintain oversight of air waybill stock and allocation across entities. Reduce misuse, gaps and manual reconciliation." },
        { name: "AWB Issuance", desc: "Issue air waybills with standardized data and governed controls. Accelerate documentation while preserving compliance quality." },
        { name: "e-AWB", desc: "Support paperless documentation processes with digital data exchange. Improve speed, accuracy and customer convenience." },
        { name: "Consolidation Management", desc: "Manage master and house shipment relationships efficiently. Preserve shipment-level visibility within consolidated movements." },
        { name: "Split Shipment Management", desc: "Handle partial movement scenarios without losing traceability. Keep customers informed when shipments move in stages." },
        { name: "Shipment Tracking", desc: "Provide end-to-end tracking across events, locations and stakeholders. Create a reliable operational view of cargo movement." },
        { name: "Shipment Milestones", desc: "Record and share milestone events throughout the journey. Enable proactive communication and service monitoring." },
        { name: "AWB Audit Controls", desc: "Apply checks to reduce documentation errors and policy deviations. Improve governance before financial settlement." }
      ]
    },
  
    terminal: {
      title: "Terminal & Cargo Operations",
      pillar: "Operational Pillar",
      eyebrow: "Terminal & Cargo Operations",
      lead: "Manages the physical movement of cargo throughout airport and terminal operations from acceptance through aircraft departure and arrival processing.",
      metaTitle: "Air Cargo Terminal Operations Software",
      metaDescription: "Run terminal cargo operations from acceptance and warehouse tasks through build-up, manifest and flight closure, plus offload and irregularity management.",
      overview: "Terminal & Cargo Operations manages the physical movement of cargo throughout airport and terminal operations from acceptance through aircraft departure and arrival processing.",
      benefits: [
        "Faster cargo turnaround",
        "Improved operational control",
        "Better resource utilization",
        "Improved service reliability"
      ],
      capabilities: [
        { name: "Cargo Acceptance", desc: "Validate cargo readiness, documentation and handling conditions at receipt. Improve process control from the first operational touchpoint." },
        { name: "Warehouse Operations", desc: "Coordinate storage, movement and task execution inside the terminal. Improve throughput visibility across warehouse activities." },
        { name: "Build-Up Management", desc: "Plan and control unitization for outbound cargo and flight readiness. Support efficient pallet and container preparation." },
        { name: "Breakdown Management", desc: "Manage inbound deconsolidation and arrival processing systematically. Speed up cargo availability for onward release." },
        { name: "Resource Planning", desc: "Align labor, equipment and operating windows to workload needs. Improve service performance while controlling costs." },
        { name: "Manifest Management", desc: "Generate and manage shipment manifests with operational accuracy. Ensure correct information flows to relevant stakeholders." },
        { name: "Flight Closure", desc: "Complete departure readiness steps with visibility into exceptions. Improve turnaround discipline before aircraft release." },
        { name: "Offload Management", desc: "Capture and resolve offloads with speed and transparency. Minimize downstream disruption to customers and partners." },
        { name: "Irregularity Management", desc: "Track disruptions, damages and operational exceptions in one place. Enable structured response and service recovery actions." }
      ]
    },
  
    uld: {
      title: "ULD Management",
      pillar: "Operational Pillar",
      eyebrow: "ULD Management",
      lead: "Provides complete lifecycle visibility and control over Unit Load Devices throughout the airline cargo network.",
      metaTitle: "Airline ULD Management Software",
      metaDescription: "Track Unit Load Devices (ULDs) across the airline network with live inventory, allocation, rotation planning, maintenance scheduling and damage records.",
      overview: "ULD Management provides complete lifecycle visibility and control over Unit Load Devices throughout the airline cargo network.",
      benefits: [
        "Increased asset utilization",
        "Reduced equipment losses",
        "Better maintenance planning",
        "Lower operating costs"
      ],
      capabilities: [
        { name: "ULD Inventory", desc: "Maintain a current view of available containers and pallets by station. Improve planning with accurate equipment inventory data." },
        { name: "ULD Tracking", desc: "Track ULD location, status and movement history across the network. Reduce blind spots around valuable assets." },
        { name: "ULD Allocation", desc: "Assign ULDs to flights and movements based on demand and availability. Improve equipment utilization across operations." },
        { name: "ULD Rotation", desc: "Plan circulation patterns to keep equipment in the right places. Support balanced network flows and reduced shortages." },
        { name: "ULD Maintenance", desc: "Schedule checks and maintenance events for serviceable equipment. Protect safety and availability with disciplined planning." },
        { name: "Damage Management", desc: "Record damage events, accountability and repair actions systematically. Lower losses and improve asset lifecycle control." }
      ]
    },
  
    revenue: {
      title: "Revenue Accounting",
      pillar: "Financial & Governance Pillar",
      eyebrow: "Revenue Accounting",
      lead: "Automates cargo billing, interline settlements and revenue assurance activities while ensuring financial accuracy across the cargo business.",
      metaTitle: "Air Cargo Revenue Accounting Software",
      metaDescription: "Automate air cargo billing, interline settlement and proration, with revenue assurance, leakage detection and audit controls that protect financial accuracy.",
      overview: "Revenue Accounting automates cargo billing, interline settlements and revenue assurance activities while ensuring financial accuracy across the cargo business.",
      benefits: [
        "Improved billing accuracy",
        "Faster settlements",
        "Reduced revenue leakage",
        "Improved financial transparency"
      ],
      capabilities: [
        { name: "Export Billing", desc: "Generate billing for outbound cargo services with policy-based controls. Improve timeliness and consistency of invoice creation." },
        { name: "Ancillary Billing", desc: "Capture charges for special handling and value-added services. Ensure non-transport revenue is billed accurately." },
        { name: "Credit Notes", desc: "Manage approved billing reversals and commercial adjustments transparently. Preserve auditability for downstream finance teams." },
        { name: "Debit Notes", desc: "Issue additional charges when revenue recovery is required. Reduce missed income from under-billed activity." },
        { name: "Interline Billing", desc: "Support structured billing and settlement with partner carriers. Improve financial coordination across shared cargo movements." },
        { name: "Proration", desc: "Allocate revenue across legs and participating parties based on rules. Standardize complex revenue distribution processes." },
        { name: "Revenue Sharing", desc: "Manage commercial sharing arrangements with partners and stakeholders. Increase transparency into revenue participation models." },
        { name: "Revenue Assurance", desc: "Monitor billing completeness and financial control points continuously. Detect risk areas before they affect reported revenue." },
        { name: "Revenue Leakage Detection", desc: "Highlight missed charges, inconsistencies and process gaps automatically. Improve recovery opportunities with targeted insight." },
        { name: "Audit Controls", desc: "Provide traceable controls, checks and supporting evidence for finance review. Strengthen governance across the accounting lifecycle." }
      ]
    },
  
    compliance: {
      title: "Compliance & Security",
      pillar: "Financial & Governance Pillar",
      eyebrow: "Compliance & Security",
      lead: "Ensures airlines comply with customs, security and industry regulations imposed by local and international authorities.",
      metaTitle: "Air Cargo Customs & Security Software",
      metaDescription: "Meet customs, security and dangerous goods obligations with digital customs integration, screening status, embargo controls, reporting and full audit trails.",
      overview: "Compliance & Security ensures airlines comply with customs, security and industry regulations imposed by local and international authorities.",
      benefits: [
        "Reduced compliance risks",
        "Improved audit readiness",
        "Faster regulatory processing"
      ],
      capabilities: [
        { name: "Customs Integration", desc: "Exchange shipment information with customs and border systems digitally. Reduce manual intervention in regulatory workflows." },
        { name: "Security Screening", desc: "Track screening status and required control steps for cargo. Improve operational confidence in secure shipment handling." },
        { name: "Dangerous Goods Validation", desc: "Validate special handling and dangerous goods requirements systematically. Reduce non-compliance risk before movement." },
        { name: "Embargo Controls", desc: "Apply policy and destination restrictions through governed rules. Prevent prohibited shipments from progressing incorrectly." },
        { name: "Regulatory Reporting", desc: "Generate required submissions and compliance outputs consistently. Improve readiness for local and cross-border obligations." },
        { name: "Compliance Auditing", desc: "Maintain audit trails for regulatory actions and control events. Support faster investigation and audit response." }
      ]
    },
  
    collaboration: {
      title: "Stakeholder Collaboration",
      pillar: "Financial & Governance Pillar",
      eyebrow: "Stakeholder Collaboration",
      lead: "Enables airlines to digitally collaborate with freight forwarders, GSAs, ground handlers, airports, customs authorities and interline partners.",
      metaTitle: "Cargo Partner Collaboration Software",
      metaDescription: "Collaborate digitally with freight forwarders, GSAs, ground handlers and interline partners through shared milestones, documents and controlled data sharing.",
      overview: "Stakeholder Collaboration enables airlines to digitally collaborate with freight forwarders, GSAs, ground handlers, airports, customs authorities and interline partners.",
      benefits: [
        "Improved collaboration",
        "Faster issue resolution",
        "Better customer experience"
      ],
      capabilities: [
        { name: "Stakeholder Onboarding", desc: "Onboard partners with structured profiles, roles and access rights. Accelerate ecosystem participation with clear controls." },
        { name: "Shared Milestones", desc: "Expose agreed operational events to relevant stakeholders in real time. Improve transparency across the shipment journey." },
        { name: "Shared Documents", desc: "Exchange commercial and operational documents through governed channels. Reduce fragmented communication and version issues." },
        { name: "Shared Notifications", desc: "Trigger alerts, updates and action prompts based on business events. Keep partners aligned without manual follow-up." },
        { name: "Controlled Data Sharing", desc: "Share the right data with the right party using permissions and rules. Enable collaboration while protecting confidentiality." },
        { name: "Partner Visibility", desc: "Give external parties relevant operational and commercial visibility. Improve coordination, trust and service responsiveness." }
      ]
    },
  
    platform: {
      title: "EMC Digital Platform",
      pillar: "Platform Foundation",
      eyebrow: "Powered by EMC Digital Platform",
      lead: "A configurable digital foundation that enables EMC Airline Cargo Suite to adapt faster, integrate cleanly and support smarter decision-making across the cargo ecosystem.",
      metaTitle: "Low-Code Air Cargo Platform & APIs",
      metaDescription: "Configure the EMC Airline Cargo Suite without code: dynamic forms, workflow and rules engines, API gateway, Cargo-IMP, Cargo-XML and IATA ONE Record support.",
      overview: "A configurable digital foundation that enables EMC Airline Cargo Suite to adapt faster, integrate cleanly and support smarter decision-making across the cargo ecosystem.",
      benefits: [
        "Configure screens, workflows & rules without software development",
        "Seamless connectivity via API Gateway, Cargo-IMP, Cargo-XML & ONE Record",
        "Enterprise organization, stakeholder & access management",
        "Intelligence platform with analytics, reporting & AI services"
      ],
      capabilities: [
        { name: "Low-Code Platform", desc: "Dynamic Form Designer, Dynamic Workflow Engine, and Dynamic Rules Engine for rapid adaptation." },
        { name: "Enterprise Platform", desc: "Organization Management, Stakeholder Management, and Identity & Access Management." },
        { name: "Connectivity Platform", desc: "API Gateway, Cargo-IMP, Cargo-XML, and ONE Record integration." },
        { name: "Intelligence Platform", desc: "Analytics, Reporting, and AI Services for data-driven decisions." }
      ]
    }
  };
  
  // Aliases mapping for legacy/sub-capability links
  const ALIASES = {
    inquiry: "commercial",
    rates: "commercial",
    acceptance: "terminal",
    manifest: "terminal",
    tracking: "awb",
    cargoimp: "platform",
    broadcasting: "platform",
    shipment: "awb",
    operations: "terminal"
  };
  
  function renderModulePage() {
    const container = document.getElementById("modmain");
    if (!container) return;
  
    const urlParams = new URLSearchParams(window.location.search);
    let key = urlParams.get("m") || "commercial";
  
    if (ALIASES[key]) key = ALIASES[key];
    if (!Object.prototype.hasOwnProperty.call(M, key)) key = "commercial";
  
    const data = M[key];
    document.title = `${data.title} — EMC Airline Cargo Suite`;
  
    const capCards = data.capabilities.map(c => `
      <div class="cap">
        <div class="cap-ico">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
        <h4>${c.name}</h4>
        <p>${c.desc}</p>
      </div>
    `).join("");
  
    const benefitItems = data.benefits.map(b => `
      <li>
        <span class="chk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg></span>
        <span>${b}</span>
      </li>
    `).join("");
  
    container.innerHTML = `
      <section class="mod-hero">
        <div class="container">
          <a class="mod-back" href="/"><svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Back to platform overview</a>
          <div style="margin-top:24px;">
            <span class="hero-badge"><span class="pill">${data.pillar}</span> EMC Airline Cargo Suite</span>
            <h1 class="mod-title">${data.title}</h1>
            <p class="mod-lead">${data.overview}</p>
          </div>
        </div>
      </section>
  
      <section class="section">
        <div class="container">
          <div class="split">
            <div class="split-copy">
              <span class="eyebrow no-line">${data.eyebrow}</span>
              <h2 class="section-title">Key Business Benefits</h2>
              <ul class="feature-list" style="margin-top:24px;">
                ${benefitItems}
              </ul>
            </div>
            <div class="mock">
              <div class="mock-head">
                <span class="mock-dot"></span>
                <span class="mock-title">${data.title} — Overview</span>
              </div>
              <div class="mock-body">
                <div class="mrow">
                  <span class="lbl">Module Status</span>
                  <span class="badge ok">Core Capability</span>
                </div>
                <div class="mrow">
                  <span class="lbl">Pillar</span>
                  <span class="val">${data.pillar}</span>
                </div>
                <div class="mrow">
                  <span class="lbl">Architecture</span>
                  <span class="val">Cloud-Native / Low-Code</span>
                </div>
                <div class="mrow">
                  <span class="lbl">Deployment</span>
                  <span class="val">EMC Digital Platform</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <section class="section" style="background:var(--bg-panel)">
        <div class="container">
          <div class="center">
            <span class="eyebrow no-line" style="justify-content:center">Business Capabilities</span>
            <h2 class="section-title">Functional Building Blocks</h2>
            <p class="section-lead">Designed for commercial, operational and financial clarity across the cargo lifecycle.</p>
          </div>
          <div class="grid cols-3" style="margin-top:40px;">
            ${capCards}
          </div>
        </div>
      </section>
  
      <section class="section">
        <div class="container">
          <div class="cta">
            <h2>Transform Cargo Operations with <span class="gradient-text">EMC</span></h2>
            <p>Request a personalized walkthrough of the ${data.title} module and complete cargo lifecycle.</p>
            <div class="cta-actions">
              <button class="btn btn-primary btn-lg">Request demo <svg class="arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
              <a class="btn btn-ghost btn-lg" href="/">Back to main platform</a>
            </div>
          </div>
        </div>
      </section>
    `;
  }
  
  document.addEventListener("DOMContentLoaded", renderModulePage);