import React, { useState } from 'react';
import { Cpu, ArrowUpRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';
import type { Project } from '../types';
import { ProjectModal } from './ProjectModal';

export const FeaturedProjects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 'gds-viewer',
      title: 'GDS Viewer',
      description: "Web-based interactive GDSII layout viewer inspired by Tiny Tapeout's GDS viewer for exploring ASIC chip floorplans, cell placements, and Sky130 metal routing layers.",
      technologies: ['TypeScript', 'GDSII', 'Sky130', 'ASIC Layout'],
      githubUrl: 'https://github.com/Ishaan2005/gds-viewer',
      demoUrl: 'https://ishaan2005.github.io/gds-viewer/',
      imageUrl: `${import.meta.env.BASE_URL}images/gdsfile.png`,
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
    {
      id: 'amba-apb3-master-slave',
      title: 'AMBA APB5 Master-Slave Module',
      description: 'FSM-based AMBA APB5 master/slave interface implemented in Verilog with read/write transaction handling.',
      technologies: ['Verilog', 'AMBA APB3', 'FSM', 'RTL'],
      githubUrl: 'https://github.com/Ishaan2005/AMBA-APB3-VerilogHDL',
      demoUrl: 'https://ishaan2005.github.io/rtl-portfolio/',
      imageUrl: `${import.meta.env.BASE_URL}images/apb.png`,
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
      id: 'stp-logic-fsm',
      title: 'STP Logic using FSM in Verilog HDL',
      description: 'Hardware modeling and formal implementation of Spanning Tree Protocol (IEEE 802.1D STP) port state and role transition logic using Finite State Machines (FSM) in Verilog HDL.',
      technologies: ['Verilog HDL', 'FSM', 'STP / IEEE 802.1D', 'Networking ASIC', 'Icarus Verilog'],
      githubUrl: 'https://github.com/Ishaan2005/STP-Logic-using-FSM-VerilogHDL',
      demoUrl: 'https://ishaan2005.github.io/rtl-portfolio/',
      imageUrl: `${import.meta.env.BASE_URL}images/stp.png`,
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
      id: 'mac-unit-openlane',
      title: 'MAC Unit in Verilog HDL and OpenLane',
      description: 'Design, verification, and end-to-end automated silicon implementation of a Multiply-Accumulate (MAC) Unit from RTL synthesis to GDSII using the OpenLane EDA flow and Sky130 PDK.',
      technologies: ['Verilog HDL', 'OpenLane', 'Sky130', 'RTL to GDSII', 'DSP Hardware'],
      githubUrl: 'https://github.com/Ishaan2005/MAC-Unit-VerilogHDL-OpenLane',
      demoUrl: 'https://ishaan2005.github.io/rtl-portfolio/',
      imageUrl: `${import.meta.env.BASE_URL}images/mac.png`,
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
      title: 'SiliconForge RTL Project Viewer',
      description: 'Professional interactive EDA workstation and RTL project visualizer featuring real-time Icarus Verilog simulation, VCD waveform rendering, and Yosys gate-level synthesis schematics.',
      technologies: ['TypeScript', 'React', 'Verilog', 'Yosys', 'VCD Parser', 'EDA Toolchain'],
      githubUrl: 'https://github.com/Ishaan2005/rtl-portfolio',
      demoUrl: 'https://ishaan2005.github.io/rtl-portfolio/',
      imageUrl: `${import.meta.env.BASE_URL}images/siliconforge.png`,
      specDetails: {
        overview:
          'Full-featured interactive EDA workstation designed for semiconductor recruiters and digital hardware engineers. Delivers in-browser Verilog testbench simulation, real-time VCD waveform extraction, and dynamic Yosys gate-level netlist schematic generation.',
        keyFeatures: [
          'Interactive multi-project RTL explorer supporting Async FIFO, RISC-V ALU, APB protocols, and custom datapaths.',
          'In-browser VCD waveform visualizer for inspecting signal transitions and clock-edge timing.',
          'Automated Yosys synthesis pipeline rendering gate-level schematics via NetlistSVG.',
          'Full-stack architecture featuring TypeScript, React, and modular simulation workers.',
        ],
        flowOrMetrics: [
          { label: 'Simulation Flow', value: 'Icarus Verilog & VCD' },
          { label: 'Synthesis Flow', value: 'Yosys / NetlistSVG' },
          { label: 'Frontend Stack', value: 'React / TypeScript' },
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
      id: 'verilog-codes',
      title: 'Verilog Codes & Digital Logic Suite',
      description: 'Comprehensive open-source repository of synthesizable Verilog HDL modules, state machine controllers, UART interfaces, ALU datapaths, and simulation testbenches.',
      technologies: ['Verilog HDL', 'ModelSim', 'GTKWave', 'Icarus Verilog', 'RTL Design'],
      githubUrl: 'https://github.com/Ishaan2005/Verilog_codes',
      specDetails: {
        overview:
          'Open-source digital hardware repository containing modular, reusable Verilog HDL codebases for digital logic design. Features FSM control logic, arithmetic datapaths, serial protocols, and self-checking simulation testbenches.',
        keyFeatures: [
          'Synthesizable digital logic modules including counters, shift registers, multiplexers, and ALUs.',
          'UART serial communication controller with configurable baud rate generator and FIFO buffers.',
          'Finite State Machine (FSM) control logic optimized for clean timing closure and simulation.',
          'Self-checking testbenches with GTKWave and Icarus Verilog waveform verification flows.',
        ],
        flowOrMetrics: [
          { label: 'Language', value: 'Verilog HDL (IEEE 1364)' },
          { label: 'Simulation', value: 'Icarus Verilog / ModelSim' },
          { label: 'Waveform Analyzer', value: 'GTKWave' },
          { label: 'Synthesis Tool', value: 'Yosys / Vivado' },
        ],
        verilogSnippet: `// Parametric Clock Divider & Baud Rate Generator
module baud_rate_gen #(
    parameter DIVISOR = 434 // 50MHz clk -> 115200 baud
)(
    input  wire clk,
    input  wire rst_n,
    output reg  tick
);
    reg [15:0] count;
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin count <= 0; tick <= 0; end
        else if (count == DIVISOR - 1) begin count <= 0; tick <= 1; end
        else begin count <= count + 1'b1; tick <= 0; end
    end
endmodule`,
      },
    },
  ];

  return (
    <section id="projects" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">
            Projects
          </h2>
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="card-hardware"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1rem',
              }}
            >
              <div>
                {/* Chip Header Tag */}
                {project.subtitle && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.65rem',
                    }}
                  >
                    <span
                      className="mono"
                      style={{
                        fontSize: '0.7rem',
                        color: 'var(--accent-cyan)',
                        background: 'var(--accent-cyan-dim)',
                        border: '1px solid var(--border-cyan)',
                        padding: '0.12rem 0.4rem',
                        borderRadius: '4px',
                      }}
                    >
                      {project.subtitle}
                    </span>
                    <Cpu size={14} style={{ color: 'var(--text-dim)' }} />
                  </div>
                )}

                {/* Project Image Preview */}
                {project.imageUrl && (
                  <div
                    style={{
                      width: '100%',
                      height: '180px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      marginBottom: '0.85rem',
                      border: '1px solid var(--border-subtle)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                      background: project.imageBg || 'var(--bg-code)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '6px',
                    }}
                  >
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        objectPosition: 'center',
                        display: 'block',
                        borderRadius: '4px',
                      }}
                    />
                  </div>
                )}

                {/* Project Title */}
                <h3
                  style={{
                    fontSize: '1.1rem',
                    color: 'var(--text-main)',
                    marginBottom: '0.35rem',
                    lineHeight: 1.25,
                  }}
                >
                  {project.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    marginBottom: '0.75rem',
                    lineHeight: 1.45,
                  }}
                >
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.3rem',
                    marginBottom: '0.85rem',
                  }}
                >
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--border-subtle)',
                  flexWrap: 'wrap',
                }}
              >
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                    style={{ flex: '1 1 auto' }}
                  >
                    Live Demo
                    <ExternalLink size={13} />
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(project)}
                  className="btn btn-secondary btn-sm"
                  style={{ flex: project.demoUrl ? '0 1 auto' : 1 }}
                >
                  View Spec
                  <ArrowUpRight size={13} />
                </button>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <GithubIcon size={14} />
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Spec Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
