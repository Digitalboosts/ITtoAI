import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { ProgramData, programs } from '../../data';

export default function ProgramEvidenceSection({ program }: { program: ProgramData }) {
  const related = programs.filter((p) => p.id !== program.id).slice(0, 3);

  return (
    <>
      <section className="py-16 lg:py-20 bg-white" aria-labelledby="evidence-heading">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="evidence-heading" className="sr-only">Projects, assessment and verification</h2>

          <div className="grid sm:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-1.5 mb-3">
                <Icon name="FolderIcon" size={15} className="text-accent" aria-hidden="true" />
                <p className="label-text text-accent">Practical Projects</p>
              </div>
              <ul className="space-y-2">
                {program.practicalProjects.map((project) => (
                  <li key={project} className="flex items-center gap-2">
                    <Icon name="CheckCircleIcon" size={14} className="text-accent flex-shrink-0" variant="solid" aria-hidden="true" />
                    <span className="text-sm text-foreground">{project}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-3">
                <Icon name="ClipboardDocumentCheckIcon" size={15} className="text-accent" aria-hidden="true" />
                <p className="label-text text-accent">Assessment</p>
              </div>
              <p className="text-sm text-muted leading-relaxed">{program.assessment}</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-1.5 mb-3">
                <Icon name="CheckBadgeIcon" size={15} className="text-accent" aria-hidden="true" />
                <p className="label-text text-accent">Verification</p>
              </div>
              <p className="text-sm text-muted leading-relaxed">{program.verification}</p>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-3">
                <Icon name="BriefcaseIcon" size={15} className="text-accent" aria-hidden="true" />
                <p className="label-text text-accent">Career Relevance</p>
              </div>
              <p className="text-sm text-muted leading-relaxed">{program.careerRelevance}</p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed pt-6 border-t border-border">
            Completing this program does not guarantee employment, placement or salary outcomes. It builds practical capability and an evidence-based profile that demonstrates it.
          </p>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 lg:py-20 bg-secondary" aria-labelledby="related-programs-heading">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
            <p id="related-programs-heading" className="label-text text-accent mb-6">Other Programs</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((p) => (
                <a
                  key={p.id}
                  href={`/programs/${p.id}`}
                  className="bg-card rounded-xl border border-border p-5 card-hover flex flex-col"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: 'rgba(37,99,235,0.08)' }}
                    aria-hidden="true"
                  >
                    <Icon name={p.icon} size={18} className="text-accent" />
                  </div>
                  <p className="text-xs font-600 text-muted mb-1">{p.currentRole}</p>
                  <div className="flex items-center gap-1.5">
                    <Icon name="ArrowRightIcon" size={12} className="text-accent flex-shrink-0" aria-hidden="true" />
                    <p className="text-sm font-700 text-foreground">{p.targetRole}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
