"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HubToStudioSection() {

  return (
    <section className="hubStudio">

      <h2>From Story Hub to Writer Studio</h2>

      <p>A seamless path from discovery to creation.</p>

      <div className="flowRow">

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image src="/images/story-hub.png" width={500} height={300} alt="" />
          <span>Story Hub</span>
        </motion.div>


        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Image src="/images/story-entry.png" width={500} height={300} alt="" />
          <span>Select Story</span>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Image src="/images/writer-studio.png" width={500} height={300} alt="" />
          <span>Writer Studio</span>
        </motion.div>


      </div>

    </section>
  );
}
