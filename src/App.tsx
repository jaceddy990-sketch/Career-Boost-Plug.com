/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CertificateGenerator } from './components/CertificateGenerator';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased selection:bg-[#00B050]/20 selection:text-[#010545]">
      <main>
        <CertificateGenerator />
      </main>
    </div>
  );
}
