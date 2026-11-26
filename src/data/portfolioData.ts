import type {
  EducationItem,
  JourneyStep,
  Project,
  SkillCategory,
  WorkExperienceItem,
} from '../types';

const asset = (file: string) => `${import.meta.env.BASE_URL}images/${file}`;

export const PROFILE = {
  name: 'Ishaan Bhimajiyani',
  shortName: 'ISHAAN',
  lastName: 'BHIMAJIYANI',
  tagline: 'ECE Engineer | RTL Design | Computer Architecture | AI Hardware',
  heroDescription:
    'I build digital systems, explore computer architecture, and work at the intersection of hardware and software.',
  email: 'ishaanbhimaji@gmail.com',
  githubUrl: 'https://github.com/Ishaan2005',
  linkedinUrl: 'https://www.linkedin.com/in/ishaan-bhimajiyani/',
  portraitHero: asset('front.jpeg'),
  portraitAbout: asset('Ishaan.jpeg'),
};

export const EDUCATION: EducationItem = {
  degree: 'Bachelor of Technology in Electronics & Communication Engineering',
  minor: 'Minor in Data Science',
  institution: 'Nirma University',
  graduation: 'Graduating November 2026',
  focus: [
    'Digital System Design',
    'VLSI Design',
    'Computer Architecture',
    'Microprocessors',
    'Data Science Minor',
  ],
};

export const ABOUT_EDITORIAL = {
  paragraphs: [
    'I’m a final-year Electronics and Communication student, passionate about data science and the intersection of hardware and software. I enjoy exploring how these areas come together to solve real-world problems and build practical solutions. I’m focused on continuous learning and always eager to explore new technologies. Outside academics, my hobbies include cubing, reading, and tinkering with old computers and systems to understand how they work and bring them back to life.',
  ],
};

export const PROJECTS: Project[] = [
  {
    id: 'amba-apb3-master-slave',
    title: 'AMBA APB3 / APB5 Master-Slave Module',
    year: 'RTL',
    category: 'Bus Protocol · FSM',
    scrapCode: 'SCRAP-01',
    accent: 'cobalt',
    description:
      'FSM-based AMBA APB3/APB5 master/slave interface implemented in Verilog with read/write transaction handling.',
    technologies: ['Verilog', 'AMBA APB3', 'FSM', 'RTL'],
    githubUrl: 'https://github.com/Ishaan2005/AMBA-APB3-VerilogHDL',
    demoUrl: 'https://ishaan2005.github.io/rtl-portfolio/',
    imageUrl: asset('apb.png'),
    imageBg: '#ffffff',
    specDetails: {
      overview:
        'Fully synthesizable Verilog implementation of the ARM AMBA 3 APB (Advanced Peripheral Bus) protocol, featuring master and slave control units with robust state-machine protocol enforcement.',
      keyFeatures: [
        'Full compliance with ARM AMBA APB v1.0 / APB3 specification standard.',
        'FSM architecture covering IDLE, SETUP, and ACCESS state transitions.',
        'Handled PREADY signal wait-state extension and PSLVERR transfer error reporting.',
        'Verified zero-wait and multi-cycle wait state read/write transaction integrity.',
      ],
      flowOrMetrics: [
        { label: 'Protocol', value: 'AMBA APB3 Spec' },
        { label: 'Control Model', value: '3-State FSM Engine' },
        { label: 'Handshake', value: 'PREADY Wait-State' },
        { label: 'Verification', value: 'Self-checking Testbench' },
      ],
      verilogSnippet: `// APB3 Master State Machine
always @(posedge PCLK or negedge PRESETn) begin
    if (!PRESETn) begin
        state <= IDLE;
        PSEL  <= 1'b0;
        PENABLE <= 1'b0;
    end else case (state)
        IDLE:   if (transfer) state <= SETUP;
        SETUP:  begin PSEL <= 1'b1; PENABLE <= 1'b0; state <= ACCESS; end
        ACCESS: begin PENABLE <= 1'b1; if (PREADY) state <= IDLE; end
    endcase
end`,
    },
  },
  {
    id: 'mac-unit-openlane',
    title: 'MAC Unit in Verilog HDL & OpenLane',
    year: 'ASIC',
    category: 'DSP · Sky130',
    scrapCode: 'SCRAP-02',
    accent: 'tomato',
    description:
      'Design, verification, and end-to-end automated silicon implementation of a Multiply-Accumulate (MAC) Unit from RTL synthesis to GDSII using the OpenLane EDA flow and Sky130 PDK.',
    technologies: ['Verilog HDL', 'OpenLane', 'Sky130', 'RTL to GDSII', 'DSP Hardware'],
    githubUrl: 'https://github.com/Ishaan2005/MAC-Unit-VerilogHDL-OpenLane',
    demoUrl: 'https://ishaan2005.github.io/rtl-portfolio/',
    imageUrl: asset('mac.png'),
    imageBg: '#ffffff',
    specDetails: {
      overview:
        'Full-flow digital physical design of a synthesizable Multiply-Accumulate (MAC) computational engine tailored for DSP datapaths and neural network accelerators. Implemented in Verilog HDL and hardened to final GDSII tapeout layout using the automated OpenLane ASIC flow on SkyWater 130nm PDK.',
      keyFeatures: [
        'Pipelined multiply-accumulate architecture optimized for high-throughput arithmetic.',
        'End-to-end OpenLane physical design flow: synthesis, floorplanning, placement, CTS, and routing.',
        'Static Timing Analysis (STA), DRC/LVS physical verification cleanly validated on Sky130 PDK.',
        'Synthesizable datapath targeting AI hardware accelerators and DSP coprocessors.',
      ],
      flowOrMetrics: [
        { label: 'Target PDK', value: 'SkyWater 130nm' },
        { label: 'Physical Flow', value: 'OpenLane / OpenROAD' },
        { label: 'Core Architecture', value: 'Pipelined Multiplier-Adder' },
        { label: 'Output Format', value: 'Synthesized GDSII' },
      ],
      verilogSnippet: `// Pipelined Multiply-Accumulate (MAC) Unit
module mac_unit #(
    parameter DATA_WIDTH = 16
)(
    input  wire                   clk,
    input  wire                   rst_n,
    input  wire                   enable,
    input  wire [DATA_WIDTH-1:0]  a_in,
    input  wire [DATA_WIDTH-1:0]  b_in,
    output reg  [2*DATA_WIDTH:0]  acc_out
);
    reg [2*DATA_WIDTH-1:0] mult_reg;
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            mult_reg <= '0;
            acc_out  <= '0;
        end else if (enable) begin
            mult_reg <= a_in * b_in;
            acc_out  <= acc_out + mult_reg;
        end
    end
endmodule`,
    },
  },
  {
    id: 'siliconforge-rtl-viewer',
    title: 'SiliconForge RTL Viewer · RISC-V & FIFO',
    year: 'EDA',
    category: 'RISC-V · Async FIFO · Yosys',
    scrapCode: 'SCRAP-03',
    accent: 'butter',
    description:
      'Interactive EDA workstation and RTL project visualizer featuring real-time Icarus Verilog simulation, VCD waveform rendering, and Yosys gate-level synthesis schematics — exploring Async FIFO, RISC-V ALU, APB protocols, and custom datapaths.',
    technologies: ['TypeScript', 'React', 'Verilog', 'Yosys', 'VCD Parser', 'RISC-V ALU', 'Async FIFO'],
    githubUrl: 'https://github.com/Ishaan2005/rtl-portfolio',
    demoUrl: 'https://ishaan2005.github.io/rtl-portfolio/',
    imageUrl: asset('siliconforge.png'),
    imageBg: '#f6f1e3',
    specDetails: {
      overview:
        'Full-featured interactive EDA workstation designed for semiconductor engineers and digital hardware verification. Delivers in-browser Verilog testbench simulation, real-time VCD waveform extraction, and dynamic Yosys gate-level netlist schematic generation across modules including Async FIFO, RISC-V ALU, APB protocols, and custom datapaths. Paired with broader computer architecture exploration in RISC-V (RV64), gem5 Simulator, cache architecture, IPC analysis, and CPU pipelines.',
      keyFeatures: [
        'Interactive multi-project RTL explorer supporting Async FIFO, RISC-V ALU, APB protocols, and custom datapaths.',
        'In-browser VCD waveform visualizer for inspecting signal transitions and clock-edge timing.',
        'Automated Yosys synthesis pipeline rendering gate-level schematics via NetlistSVG.',
        'Full-stack architecture featuring TypeScript, React, and modular simulation workers.',
      ],
      flowOrMetrics: [
        { label: 'Simulation Flow', value: 'Icarus Verilog & VCD' },
        { label: 'Synthesis Flow', value: 'Yosys / NetlistSVG' },
        { label: 'Arch Focus', value: 'RISC-V (RV64) & gem5' },
        { label: 'Toolchain Focus', value: 'EDA Workstation' },
      ],
      verilogSnippet: `// SiliconForge EDA Runner Configuration
interface EDAPipelineConfig {
  compiler: 'iverilog -g2012';
  simulator: 'vvp -n';
  waveformFormat: 'VCD (Value Change Dump)';
  synthesisEngine: 'yosys -p "prep; show"';
}`,
    },
  },
  {
    id: 'stp-logic-fsm',
    title: 'STP Logic using FSM in Verilog HDL',
    year: 'FSM',
    category: 'Networking ASIC · Verilog',
    scrapCode: 'SCRAP-04',
    accent: 'pistachio',
    description:
      'Hardware modeling and implementation of Spanning Tree Protocol (IEEE 802.1D STP) port state and role transition logic using Finite State Machines (FSM) in Verilog HDL.',
    technologies: ['Verilog HDL', 'FSM', 'STP / IEEE 802.1D', 'Networking ASIC', 'Icarus Verilog'],
    githubUrl: 'https://github.com/Ishaan2005/STP-Logic-using-FSM-VerilogHDL',
    demoUrl: 'https://ishaan2005.github.io/rtl-portfolio/',
    imageUrl: asset('stp.png'),
    imageBg: '#ffffff',
    specDetails: {
      overview:
        'Hardware-native implementation of IEEE 802.1D Spanning Tree Protocol (STP) state machine logic in synthesizable Verilog HDL. Designed to eliminate network loops and broadcast storms in Ethernet switch fabrics by managing Blocking, Listening, Learning, and Forwarding port transitions in dedicated digital hardware.',
      keyFeatures: [
        'Synthesizable FSM architecture enforcing Blocking, Listening, Learning, and Forwarding port states.',
        'BPDU (Bridge Protocol Data Unit) packet processing and root port selection logic.',
        'Hardware-accelerated loop prevention offloading CPU processing on switch line cards.',
        'Comprehensive simulation verification using Icarus Verilog and GTKWave timing analysis.',
      ],
      flowOrMetrics: [
        { label: 'Protocol Standard', value: 'IEEE 802.1D (STP)' },
        { label: 'FSM Architecture', value: '4-State Port Engine' },
        { label: 'Verification', value: 'Icarus / GTKWave' },
        { label: 'Target Platform', value: 'Switch Fabric ASIC' },
      ],
      verilogSnippet: `// STP Port State Machine Transition Logic
always @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
        state <= BLOCKING;
        forward_enable <= 1'b0;
        learn_enable   <= 1'b0;
    end else case (state)
        BLOCKING:   if (bpdu_received && is_root_port) state <= LISTENING;
        LISTENING:  if (forward_delay_timer) state <= LEARNING;
        LEARNING:   begin learn_enable <= 1'b1; if (forward_delay_timer) state <= FORWARDING; end
        FORWARDING: begin forward_enable <= 1'b1; learn_enable <= 1'b1; if (link_failure) state <= BLOCKING; end
    endcase
end`,
    },
  },
  {
    id: 'gds-viewer',
    title: 'GDS Viewer',
    year: 'VLSI',
    category: 'GDSII · Canvas',
    scrapCode: 'SCRAP-05',
    accent: 'tomato',
    description:
      "Web-based interactive GDSII layout viewer inspired by Tiny Tapeout's GDS viewer for exploring ASIC chip floorplans, cell placements, and Sky130 metal routing layers.",
    technologies: ['TypeScript', 'GDSII', 'Sky130', 'ASIC Layout'],
    githubUrl: 'https://github.com/Ishaan2005/gds-viewer',
    demoUrl: 'https://ishaan2005.github.io/gds-viewer/',
    imageUrl: asset('gdsfile.png'),
    imageBg: '#1d1e20',
    specDetails: {
      overview:
        "Open-source physical layout visualizer designed as a clone of Tiny Tapeout's GDS viewer. Renders GDSII IC layouts directly in the browser with multi-layer visibility, cell hierarchy inspection, and real-time canvas navigation.",
      keyFeatures: [
        'Interactive pan, zoom, and layer toggles for Sky130 PDK metal and via stacks (met1-met5, li1).',
        'Fast parsing and canvas rendering of GDSII boundary elements, paths, and cell references.',
        'Visual floorplan density and cell placement inspection for open-source silicon submissions.',
        'Inspired by Tiny Tapeout open-source chip layout visualization workflows.',
      ],
      flowOrMetrics: [
        { label: 'Target PDK', value: 'Sky130 (130nm CMOS)' },
        { label: 'Renderer Engine', value: 'HTML5 Canvas / TS' },
        { label: 'Layer Support', value: 'Full Sky130 Stack' },
        { label: 'Tool Focus', value: 'Silicon Layout Viewer' },
      ],
      verilogSnippet: `// GDSII Layer Mask Renderer Config
const sky130Layers = {
  li1:  { id: 67,  color: '#0055ff', name: 'Local Interconnect' },
  met1: { id: 68,  color: '#00aa55', name: 'Metal 1' },
  met2: { id: 69,  color: '#ffaa00', name: 'Metal 2' },
  met3: { id: 70,  color: '#ff0055', name: 'Metal 3' },
};`,
    },
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'rtl-digital',
    code: 'BENCH · 01',
    title: 'Verilog HDL & Digital Design',
    iconName: 'Cpu',
    summary: 'Synthesizable RTL blocks, protocol controllers, and arithmetic datapaths.',
    skills: [
      'Verilog HDL (IEEE 1364)',
      'SystemVerilog',
      'RTL Design & FSMs',
      'Timing Analysis',
      'AMBA APB3 / APB5',
      'UART & FIFO Buffers',
      'MAC Units & Register Files',
    ],
    featured: true,
  },
  {
    id: 'verification',
    code: 'BENCH · 02',
    title: 'RTL Design & Functional Verification',
    iconName: 'Activity',
    summary: 'Cycle-accurate testbenches, waveform inspection, and netlist validation.',
    skills: [
      'Icarus Verilog (iverilog / vvp)',
      'GTKWave',
      'ModelSim',
      'Self-Checking Testbenches',
      'VCD Waveform Parsing',
    ],
  },
  {
    id: 'fpga-asic',
    code: 'BENCH · 03',
    title: 'FPGA & ASIC Design Workflows',
    iconName: 'Layers',
    summary: 'Open-source silicon compilation from behavioral RTL down to GDSII.',
    skills: [
      'OpenLane',
      'OpenROAD',
      'Yosys & NetlistSVG',
      'Sky130 PDK (130nm)',
      'RTL-to-GDSII Flow',
      'Vivado',
      'STA / DRC / LVS',
    ],
    featured: true,
  },
  {
    id: 'arch-riscv',
    code: 'BENCH · 04',
    title: 'Computer Architecture & RISC-V',
    iconName: 'CircuitBoard',
    summary: 'Instruction sets, microarchitectural simulation, and AI compute hardware.',
    skills: [
      'RISC-V (RV64)',
      'gem5 Simulator',
      'Cache Architecture',
      'IPC Analysis',
      'CPU Pipelines',
      'AI Hardware & Systolic Arrays',
    ],
  },
  {
    id: 'python-ds',
    code: 'BENCH · 05',
    title: 'Python & Data Science',
    iconName: 'Code2',
    summary: 'Minor in Data Science paired with engineering automation and preprocessing.',
    skills: ['Python', 'Data Pre-Processing', 'Automation Scripting', 'TypeScript / React'],
  },
  {
    id: 'systems-tools',
    code: 'BENCH · 06',
    title: 'Linux, Git & Systems Tooling',
    iconName: 'Terminal',
    summary: 'Infrastructure, industrial protocols, and version-controlled workflows.',
    skills: [
      'Linux (Rocky Linux)',
      'Git & GitHub',
      'Zabbix Monitoring',
      'SCADA & RTU',
      'MODBUS / PROFIBUS / Fieldbus',
      'Cisco 1941 & VLAN Routing',
    ],
  },
];

export const WORK_EXPERIENCE: WorkExperienceItem[] = [
  {
    id: 'ishan-tech',
    role: 'Network Monitoring Intern',
    company: 'Ishan Technologies',
    period: 'Feb 2026 – July 2026',
    location: 'Ahmedabad',
    domain: 'ISP Network Infrastructure & Monitoring',
    imageUrl: asset('certi.png'),
    description:
      "Worked at the center of an ISP as a network monitoring intern, monitoring and helping manage the company's network. Collaborated with network engineers and system administrators. Applied basic automation using Python scripts. Helped maintain and improve the Zabbix based monitoring system, along with data pre-processing. Provided testing inputs for the newly implemented N-ticketing module.",
    technologies: [
      'ISP Network Monitoring',
      'Zabbix',
      'Python Automation',
      'Data Pre-Processing',
      'System Administration',
      'N-Ticketing Module',
      'Network Operations',
    ],
  },
  {
    id: 'ongc',
    role: 'Summer Intern',
    company: 'ONGC (Oil and Natural Gas Corporation)',
    period: 'May 2025 – June 2025',
    location: 'Ahmedabad',
    domain: 'Industrial Automation & Networking',
    imageUrl: asset('ongc.jpg'),
    description:
      'Interned at ONGC, where I explored real-world industrial automation and networking. I worked with SCADA systems and RTUs, and gained hands-on experience with MODBUS, PROFIBUS, and FOUNDATION Fieldbus protocols. I configured VLANs, and set up Inter-VLAN and Intra-VLAN routing on Cisco 1941 routers and Catalyst switches. I also set up PXE boot and built offline YUM repositories on Rocky Linux.',
    technologies: [
      'SCADA & RTU',
      'MODBUS',
      'PROFIBUS',
      'FOUNDATION Fieldbus',
      'Cisco 1941',
      'Catalyst Switches',
      'VLAN / Inter-VLAN Routing',
      'PXE Boot',
      'YUM Repositories',
      'Rocky Linux',
    ],
  },
];

export const ENGINEERING_JOURNEY: JourneyStep[] = [
  {
    stage: '01',
    label: 'ECE Engineering · Nirma University',
    description:
      'Undergraduate study in Electronics & Communication Engineering (Minor in Data Science), digital logic, circuits, and microprocessors.',
  },
  {
    stage: '02',
    label: 'Network & Systems Internships',
    description:
      'Industrial automation, SCADA/VLANs at ONGC and ISP network operations, Zabbix, and Python automation at Ishan Technologies.',
  },
  {
    stage: '03',
    label: 'VLSI & RTL Design',
    description:
      'Synthesizable Verilog protocols (AMBA APB3, STP, UART/FIFO), OpenLane RTL-to-GDSII flows on Sky130, and open EDA visualizers.',
  },
  {
    stage: '04',
    label: 'Computer Architecture & AI Hardware',
    description:
      'RISC-V (RV64) and gem5 microarchitecture exploration, MAC datapaths, and efficient hardware accelerators for AI compute.',
  },
];

export const FOOTER_BADGES = [
  { label: 'RTL Design', sub: 'VERILOG' },
  { label: 'FPGA', sub: 'LOGIC' },
  { label: 'ASIC', sub: 'SKY130' },
  { label: 'RISC-V', sub: 'RV64 ISA' },
  { label: 'Computer Architecture', sub: 'GEM5' },
  { label: 'AI Hardware', sub: 'MAC · DSP' },
  { label: 'OpenLane', sub: 'RTL→GDS' },
  { label: 'AMBA APB', sub: 'BUS FSM' },
  { label: 'Verification', sub: 'GTKWAVE' },
  { label: 'Data Science', sub: 'PYTHON' },
] as const;

export const SCRAP_WALL_ITEMS = [
  {
    projectId: 'gds-viewer',
    label: 'Sky130 GDSII Floorplan',
    tag: 'GDS Viewer',
    image: asset('gdsfile.png'),
  },
  {
    projectId: 'amba-apb3-master-slave',
    label: 'AMBA APB3 State Machine',
    tag: 'APB3 FSM',
    image: asset('apb.png'),
  },
  {
    projectId: 'mac-unit-openlane',
    label: 'MAC Datapath Architecture',
    tag: 'MAC Unit',
    image: asset('mac.png'),
  },
  {
    projectId: 'siliconforge-rtl-viewer',
    label: 'SiliconForge RTL Workstation',
    tag: 'SiliconForge',
    image: asset('siliconforge.png'),
  },
  {
    projectId: 'stp-logic-fsm',
    label: 'IEEE 802.1D Bridge Topology',
    tag: 'STP FSM',
    image: asset('stp.png'),
  },
] as const;
