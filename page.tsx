import React from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { ThoughtLink } from "@/components/Thought";
import Icon from "@/components/Icon";

export default function Experiments() {
  const experiments = [
    {
      name: "Fields",
      slug: "fields",
      created: "15th Jan 2025",
    },
    {
      name: "Smears",
      slug: "smears",
      created: "14th Jan 2025",
    },
    {
      name: "RESSENCE 1",
      slug: "ressence1",
      created: "17th December 2024",
    },
    {
      name: "Flowers",
      slug: "flowers",
      created: "9th December 2024",
    },
    {
      name: "Dot Spiral",
      slug: "dot-spiral",
      created: "9th December 2024",
    },
    {
      name: "Spaghetti",
      slug: "spaghetti",
      created: "4th November 2024",
    },
    {
      name: "Geometric Towers",
      slug: "pattern-towers",
      created: "4th November 2024",
    },
    {
      name: "Dynamic Gradients",
      slug: "dynamic-gradients",
      created: "1st November 2024",
    },
    {
      name: "Cursor Arcs",
      slug: "cursor-arcs",
      created: "1st November 2024",
    },
  ];

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-12">Experiments</h1>
      <ul>
        {experiments.map((experiment) => (
          <li key={experiment.name}>
            <ThoughtLink>
              <Link href={`/experiments/${experiment.slug}`}>
                💡&nbsp;
                {experiment.name}
              </Link>
              <span className="text-sm text-gray-500 ml-4">
                ({experiment.created})
              </span>
            </ThoughtLink>
          </li>
        ))}
        <li>
          <a
            href="https://github.com/hazzahex/hazzahex-experiments"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "12px",
                alignItems: "center",
                marginTop: "24px",
              }}
            >
              <Icon name="github" />
              code for these experiments
            </div>
          </a>
        </li>
      </ul>
    </Layout>
  );
}
