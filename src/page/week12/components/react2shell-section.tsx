import {
  ArrowRight,
  Server,
  ShieldAlert,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const React2ShellSection = () => {
  const [isPatched, setIsPatched] = useState(false);
  const [payloadType, setPayloadType] = useState<'legit' | 'malicious'>(
    'legit',
  );
  const [serverStatus, setServerStatus] = useState<
    'idle' | 'processing' | 'compromised' | 'safe'
  >('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [showShell, setShowShell] = useState(false);

  const payloads = {
    legit: {
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: `["$K1"]\n1:{"name":"John Doe", "email":"john@example.com"}`,
    },
    malicious: {
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: `["$K1"]\n1:{"__proto__":{"polluted":true}, "run": "require('child_process').exec('/bin/sh')"}`,
      // Simplified representation of the actual complex deserialization gadget
    },
  };

  const addLog = (msg: string) =>
    setLogs((prev) =>
      [
        ...prev,
        `[${new Date().toLocaleTimeString().split(' ')[0]}] ${msg}`,
      ].slice(-6),
    );

  const handleSendRequest = async () => {
    setServerStatus('processing');
    setShowShell(false);
    setLogs([]);

    addLog(`POST /action/updateUser`);
    addLog(`Payload size: ${payloadType === 'legit' ? '54B' : '108B'}`);

    await new Promise((r) => setTimeout(r, 800));

    addLog('RSC Flight Protocol Deserializing...');

    await new Promise((r) => setTimeout(r, 800));

    if (payloadType === 'legit') {
      addLog('✅ Object deserialized successfully');
      addLog('Executed: updateUser({ name: "John Doe" ... })');
      setServerStatus('safe');
    } else {
      if (isPatched) {
        addLog('🛡️ Security Exception: Illegal object structure');
        addLog('❌ Deserialization blocked by React 19.1.2 patch');
        setServerStatus('safe');
      } else {
        addLog('⚠️ WARNING: Prototype pollution detected');
        addLog('🔥 Executing arbitrary code...');
        setServerStatus('compromised');
        setTimeout(() => setShowShell(true), 500);
      }
    }
  };

  return (
    <SectionCard
      badge={{ label: 'Critical Vulnerability', color: 'purple' }}
      title="React2Shell (CVE-2025-55182)"
      description="The CVSS 10.0 RCE vulnerability in React Server Components"
    >
      <div className="space-y-8">
        <SubSection title="What is React2Shell?" icon iconColor="red">
          <InfoBox variant="red" title="Unauthenticated Remote Code Execution">
            <p className="text-sm leading-relaxed">
              React2Shell is a critical vulnerability in the React Server
              Components (RSC) architecture. It exploits an insecure
              deserialization flaw in the "Flight" protocol used by React to
              communicate between server and client.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-3">
              <li>
                <strong>CVSS Score:</strong> 10.0 (Critical)
              </li>
              <li>
                <strong>Mechanism:</strong> Malicious payload triggers prototype
                pollution or code execution during deserialization.
              </li>
              <li>
                <strong>Impact:</strong> Full server takeover without
                authentication.
              </li>
              <li>
                <strong>Affected:</strong> Next.js &lt; 15.0.5, React &lt;
                19.0.1 (Experimental/Canary channels).
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection title="Exploit Simulator" icon iconColor="blue">
          <DemoBox label="Server Action RCE Playground">
            <div className="space-y-6">
              {/* Controls */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50 p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-gray-500 uppercase">
                      React Version
                    </label>
                    <button
                      onClick={() => setIsPatched(!isPatched)}
                      className={`mt-1 px-3 py-1 rounded text-sm font-bold flex items-center gap-2 transition-colors ${
                        isPatched
                          ? 'bg-green-100 text-green-700 border border-green-200'
                          : 'bg-red-100 text-red-700 border border-red-200'
                      }`}
                    >
                      {isPatched ? (
                        <ShieldCheck size={16} />
                      ) : (
                        <ShieldAlert size={16} />
                      )}
                      {isPatched ? 'Patched (v19.1.2)' : 'Vulnerable (v19.0.0)'}
                    </button>
                  </div>

                  <div className="h-8 w-px bg-gray-300 mx-2 hidden md:block" />

                  <div className="flex flex-col w-full md:w-auto">
                    <label className="text-xs font-bold text-gray-500 uppercase">
                      Payload Type
                    </label>
                    <div className="flex gap-2 mt-1">
                      <button
                        onClick={() => setPayloadType('legit')}
                        className={`px-3 py-1 rounded text-sm transition-colors ${payloadType === 'legit' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border'}`}
                      >
                        Normal Data
                      </button>
                      <button
                        onClick={() => setPayloadType('malicious')}
                        className={`px-3 py-1 rounded text-sm transition-colors ${payloadType === 'malicious' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 border'}`}
                      >
                        Exploit Payload
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSendRequest}
                  disabled={serverStatus === 'processing'}
                  className={`px-6 py-2 rounded-lg font-bold text-white shadow-md transition-all active:scale-95 ${
                    serverStatus === 'processing'
                      ? 'bg-gray-400 cursor-not-allowed'
                      : payloadType === 'malicious'
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  Send Request
                </button>
              </div>

              {/* Graphical Flow */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Attacker */}
                <div className="col-span-1 border-2 border-gray-200 rounded-xl overflow-hidden bg-white flex flex-col">
                  <div className="bg-gray-100 px-4 py-2 border-b flex items-center gap-2">
                    <Terminal size={16} className="text-gray-600" />
                    <span className="text-xs font-bold text-gray-700">
                      Attacker Terminal
                    </span>
                  </div>
                  <div className="p-4 flex-1 bg-gray-900 overflow-hidden">
                    <pre className="text-xs font-mono text-green-400 whitespace-pre-wrap break-all">
                      {`POST /action/updateUser HTTP/1.1\nHost: target-server.com\n\n${payloads[payloadType].body}`}
                    </pre>
                  </div>
                </div>

                {/* Connection Visual */}
                <div className="hidden md:flex flex-col items-center justify-center text-gray-400">
                  <div
                    className={`h-1 w-full relative ${serverStatus === 'processing' ? 'bg-blue-200' : 'bg-gray-200'}`}
                  >
                    {serverStatus === 'processing' && (
                      <div className="absolute top-0 left-0 h-full w-1/3 bg-blue-600 animate-slide" />
                    )}
                  </div>
                  <ArrowRight className="mt-2" />
                  <span className="text-xs mt-1">RSC Flight Protocol</span>
                </div>

                {/* Server */}
                <div
                  className={`col-span-1 border-2 rounded-xl overflow-hidden flex flex-col transition-colors duration-500 ${
                    serverStatus === 'compromised'
                      ? 'border-red-500 shadow-red-200 shadow-xl'
                      : 'border-gray-200'
                  }`}
                >
                  <div
                    className={`px-4 py-2 border-b flex items-center justify-between ${
                      serverStatus === 'compromised'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Server size={16} />
                      <span className="text-xs font-bold">Target Server</span>
                    </div>
                    <span className="text-[10px] bg-black/10 px-2 py-0.5 rounded">
                      {isPatched ? 'React 19.1.2' : 'React 19.0.0'}
                    </span>
                  </div>

                  <div className="p-4 flex-1 bg-white relative min-h-[160px]">
                    {showShell ? (
                      <div className="absolute inset-0 bg-black p-4 font-mono text-green-500 text-xs animate-in fade-in zoom-in-95">
                        <p>root@server:~# whoami</p>
                        <p>root</p>
                        <p>root@server:~# ls -la /etc/passwd</p>
                        <p>
                          -rw-r--r-- 1 root root 2883 Dec 20 10:00 /etc/passwd
                        </p>
                        <p className="animate-pulse">_</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {logs.length === 0 ? (
                          <div className="text-center text-gray-400 text-xs mt-10">
                            Waiting for requests...
                          </div>
                        ) : (
                          logs.map((log, i) => (
                            <div
                              key={i}
                              className="text-xs font-mono border-b border-gray-50 pb-1 last:border-0"
                            >
                              <span
                                className={
                                  log.includes('❌') || log.includes('⚠️')
                                    ? 'text-red-600 font-bold'
                                    : log.includes('✅') || log.includes('🛡️')
                                      ? 'text-green-600 font-bold'
                                      : 'text-gray-600'
                                }
                              >
                                {log}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="Vulnerable Code Pattern" icon iconColor="purple">
          <CodeBlock
            code={`// SERVER ACTION (Vulnerable in unpatched React)
"use server";

export async function updateUser(userData) {
  // CVE-2025-55182 happens BEFORE this code runs!
  // The vulnerability is in the deserialization of arguments
  // passed to this function by the RSC framework.
  
  await db.users.update({ ... });
}

// ATTACKER PAYLOAD (Conceptual)
// Sends a specially crafted object structure that React's
// internal deserializer mishandles, overwriting
// Object.prototype or triggering internal gadgets.
POST /path/to/action
["$K1"]
1:{"__proto__": ... }`}
            className="text-xs"
          />
        </SubSection>

        <SubSection title="Mitigation Checklist" icon iconColor="green">
          <div className="space-y-2">
            {[
              'Upgrade React to v19.0.1, 19.1.2, or latest',
              'Upgrade Next.js to v15.0.5+ or v14.2.x patches',
              'Use a WAF to filter malicious payloads (temporary)',
              'Rotate potentially exposed secrets/keys',
              'Monitor server logs for unusual deserialization errors',
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm bg-green-50 p-2 rounded"
              >
                <span className="text-green-500">✓</span>
                {item}
              </div>
            ))}
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
