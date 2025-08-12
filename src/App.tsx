import Sidebar from "./components/Sidebar";
import { useFlowStore } from "./types/store";
import SaveBar from "./components/SaveBar";
import Canvas from "./components/Canvas";
import SettingsPanel from "./components/SettingsPanel";

export default function App() {
  const selectedNodeId = useFlowStore((s) => s.selectedNodeId);

  return (
    <div className="app">
      <div className="topbar">
        <div className="brand">Flow Builder</div>
        <SaveBar />
      </div>
      <div className="container">
        <aside className="sidebar" style={{ position: "relative" }}>
          {/* Nodes list */}
          <div
            style={{ display: selectedNodeId ? "none" : "block" }}
            aria-hidden={!!selectedNodeId}
          >
            <Sidebar />
          </div>

          {/* Settings (stays mounted, shown only when a node is selected) */}
          <div
            style={{ display: selectedNodeId ? "block" : "none" }}
            aria-hidden={!selectedNodeId}
          >
            <SettingsPanel />
          </div>
        </aside>
        <main>
          <Canvas />
        </main>
      </div>
    </div>
  );
}
