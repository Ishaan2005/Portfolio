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
      subtitle: 'Tiny Tapeout Interactive Layout Visualizer',
      description: "Web-based interactive GDSII layout viewer inspired by Tiny Tapeout's GDS viewer for exploring ASIC chip floorplans, cell placements, and Sky130 metal routing layers.",
      technologies: ['TypeScript', 'GDSII', 'Sky130', 'ASIC Layout'],
      githubUrl: 'https://github.com/Ishaan2005/gds-viewer',
      demoUrl: 'https://ishaan2005.github.io/gds-viewer/',
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
      title: 'AMBA APB3 Master / Slave',
      subtitle: 'Synchronous Peripheral Bus Interface',
      description: 'FSM-based AMBA APB3 master/slave interface implemented in Verilog with read/write transaction handling.',
      technologies: ['Verilog', 'AMBA APB3', 'FSM', 'RTL'],
      githubUrl: 'https://github.com/Ishaan2005/AMBA-APB3-VerilogHDL',
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
      id: 'verilog-codes',
      title: 'Verilog Codes & Digital Logic Suite',
      subtitle: 'Open-Source RTL Modules & Testbenches',
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
          <div className="section-tag">
            <Cpu size={14} /> FEATURED ENGINEERING PROJECTS
          </div>
          <h2 className="section-title">
            Digital Design & Silicon Implementations
          </h2>
          <p className="section-subtitle">
            Open-source silicon tools, RTL codebases, bus protocol interfaces, and interactive layout visualization.
          </p>
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.15rem',
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
                padding: '1.25rem',
              }}
            >
              <div>
                {/* Chip Header Tag */}
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
                      fontSize: '0.725rem',
                      color: 'var(--accent-cyan)',
                      background: 'var(--accent-cyan-dim)',
                      border: '1px solid var(--border-cyan)',
                      padding: '0.15rem 0.45rem',
                      borderRadius: '4px',
                    }}
                  >
                    {project.subtitle || 'HARDWARE MODULE'}
                  </span>
                  <Cpu size={15} style={{ color: 'var(--text-dim)' }} />
                </div>

                {/* Project Title */}
                <h3
                  style={{
                    fontSize: '1.1875rem',
                    color: 'var(--text-main)',
                    marginBottom: '0.5rem',
                    lineHeight: 1.25,
                  }}
                >
                  {project.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    marginBottom: '1rem',
                    lineHeight: 1.5,
                  }}
                >
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.35rem',
                    marginBottom: '1.15rem',
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
                  gap: '0.5rem',
                  paddingTop: '1rem',
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
                    <ExternalLink size={14} />
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(project)}
                  className="btn btn-secondary btn-sm"
                  style={{ flex: project.demoUrl ? '0 1 auto' : 1 }}
                >
                  View Spec
                  <ArrowUpRight size={14} />
                </button>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <GithubIcon size={16} />
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
