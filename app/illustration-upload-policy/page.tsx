export const metadata = {
  title: "Illustration and Upload Policy | NextScenes",
  description:
    "NextScenes Illustration and Upload Policy explaining artwork, scene illustrations, children’s drawings, image rights, consent, moderation, and public display.",
};

const title = "Illustration and Upload Policy";
const subtitle =
  "How NextScenes handles artwork, scene illustrations, children’s drawings, image rights, consent, and public display.";

const blocks = [
  {
    type: "p",
    text: "NextScenes welcomes visual storytelling. A drawing, sketch, cover image, comic panel, or scene illustration can deepen the life of a story and help readers feel its world more clearly. But images also carry responsibility. A picture may contain someone’s identity, a child’s privacy, another creator’s work, or material that may not be suitable for a public storytelling platform. For that reason, NextScenes treats uploaded and submitted illustrations with care, moderation, and respect for both creativity and safety.",
  },
  {
    type: "p",
    text: "This policy explains how illustrations and image uploads are handled on NextScenes. It applies to authors, contributors, readers, young illustrators, teachers, parents, guardians, schools, and any person submitting or managing visual material on the platform.",
  },
  {
    type: "h2",
    text: "Uploading is not publishing",
  },
  {
    type: "p",
    text: "Submitting an illustration to NextScenes does not mean the image will automatically appear in public. Uploading is not publishing. Every scene illustration is treated first as submitted material. It remains pending until it is reviewed and approved by the story owner, an administrator, or another authorized reviewer. A pending illustration is not displayed publicly in Reader View. A rejected illustration is also not displayed publicly. An illustration becomes visible to readers only when the image itself has been approved and the scene connected to it has become part of the approved Canon.",
  },
  {
    type: "h2",
    text: "Original work, rights, and AI-generated images",
  },
  {
    type: "p",
    text: "Anyone submitting an illustration must have the right to submit it. The image should either be created by the person submitting it, submitted with permission from the creator or rights holder, properly licensed for this kind of use, or generated through an AI tool in a way that allows its use under the tool’s terms. Images copied from books, websites, films, games, social media, stock libraries, or another creator’s work should not be submitted unless the contributor has the legal and moral right to use them. Where there is doubt about ownership or permission, NextScenes may reject, hide, or remove the image.",
  },
  {
    type: "p",
    text: "AI-generated images may be used on NextScenes, but they must still respect this policy. The person submitting an AI-generated image remains responsible for making sure that the image does not violate another person’s rights, imitate a private individual without consent, copy a protected artistic style in a misleading way, or contain unsafe or inappropriate material. AI-generated images should not be used to deceive readers into thinking they are real photographs, historical records, official documents, or verified portraits. Where necessary, NextScenes may require that an image be identified as AI-generated.",
  },
  {
    type: "h2",
    text: "Images of real people and children’s artwork",
  },
  {
    type: "p",
    text: "Images of real people require special caution. Contributors should not submit photographs, edited photographs, realistic portraits, or AI-generated likenesses of identifiable people unless they have permission to do so. This is especially important where the image involves private individuals, family members, school pupils, children, community members, or people photographed at public events. NextScenes may reject or remove any image that appears to expose someone’s identity, likeness, privacy, or dignity without proper consent.",
  },
  {
    type: "p",
    text: "Children’s artwork deserves encouragement, but child safety comes first. NextScenes may provide spaces for children’s drawings and young illustrators, but children’s material must be submitted only by a parent, guardian, teacher, school representative, or approved responsible adult. A child’s full name, face, school name, home address, phone number, personal email address, school uniform details, or any private identifying information should not be included with the submission. Children create; responsible adults submit; NextScenes moderates.",
  },
  {
    type: "h2",
    text: "Prohibited and harmful images",
  },
  {
    type: "p",
    text: "Certain images are not allowed on NextScenes. The platform may reject or remove images that contain or promote sexual content involving minors, exploitation, abuse, grooming, hateful or discriminatory material, graphic cruelty, harassment, humiliation, non-consensual intimate images, private personal information, illegal activity, terrorist or extremist propaganda, copyright infringement, deceptive impersonation, malicious links, embedded scripts, or unsafe files. NextScenes is a storytelling platform, not a hiding place for harmful material.",
  },
  {
    type: "p",
    text: "NextScenes respects stories that deal with difficult subjects, including history, injustice, tradition, belief, conflict, grief, and moral struggle. However, illustrations should not be used to mock, dehumanize, or deliberately insult a people, faith, culture, language, or community. Creative freedom is respected, but cruelty is not creativity. A strong story may disturb the conscience, but it should not trample human dignity for sport.",
  },
  {
    type: "h2",
    text: "Review, rejection reasons, and contributor notice",
  },
  {
    type: "p",
    text: "Story owners and authorized reviewers may approve or reject submitted illustrations. If an illustration is rejected, NextScenes may record a reason for that decision, such as that the image does not match the scene, the image quality is not suitable, there is a consent or copyright concern, there is a safety or policy concern, or another reason applies. Where appropriate, a short note may also be sent to the contributor. This is not meant to shame contributors. It is meant to help them understand the decision and improve future submissions. Rejected illustration details are not shown publicly in Reader View.",
  },
  {
    type: "h2",
    text: "Removal, takedown, and no guarantee of publication",
  },
  {
    type: "p",
    text: "NextScenes may remove an image if it appears to violate this policy, the rights of another person, platform rules, or applicable law. A person who believes an image violates their rights, privacy, consent, safety, or ownership may contact NextScenes and request review or removal. Where appropriate, NextScenes may hide or remove the image while the concern is being reviewed.",
  },
  {
    type: "p",
    text: "Submitting an illustration does not guarantee approval, display, promotion, or permanent availability on the platform. NextScenes may reject, hide, remove, replace, or review images where necessary to protect the story, the author, contributors, readers, children, the platform, or the public.",
  },
  {
    type: "h2",
    text: "Contributor responsibility and platform responsibility",
  },
  {
    type: "p",
    text: "By submitting an illustration, the contributor confirms that they have the right to submit the image, that the image does not violate another person’s rights, that it does not contain unsafe private information, and that it follows this policy. If the image involves a real person, the contributor confirms that they have permission. If the image is a child’s artwork, the contributor confirms that they are a responsible adult authorized to submit it.",
  },
  {
    type: "p",
    text: "NextScenes aims to support imagination with conscience. The platform uses review controls, approval status, rejection reasons, contributor notifications, and public display guards to reduce harm while encouraging serious creative expression. No system is perfect, but the standard is clear: images should serve the story without harming people.",
  },
];

export default function PolicyPage() {
  return (
    <main className="ns-page ns-compact ns-policy-page">
      <h1 className="ns-h1">{title}</h1>
      {subtitle ? <p className="ns-subtitle">{subtitle}</p> : null}

      <section className="ns-section ns-paper" style={{ marginTop: 18 }}>
        {blocks.map((block, index) =>
          block.type === "h2" ? (
            <h2 className="ns-h2" key={index}>{block.text}</h2>
          ) : (
            <p className="ns-p" key={index}>{block.text}</p>
          )
        )}
      </section>
    </main>
  );
}
