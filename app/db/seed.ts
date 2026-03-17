import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { writings, videos, siteContent } from "./schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

// Import existing data
const existingWritings = [
  {
    title: "Steering Salience",
    source: "",
    date: "under review",
    reference: "",
    author: "Glasser",
    abstract:
      "Something is salient when it spontaneously grabs an agent's attention— the crack of thunder; a forceful memory; the eyes of a stranger. As a cue for attention, salience plays a crucial role in subsequent cognition. Amidst a recent flurry of research across disciplines, two apparently contradictory aspects of salience have emerged: 1) agents can be evaluated for what is salient to them and 2) salience is a passive process. Proponents of 1) leverage salience to capture unique virtues and vices for attending (in)appropriately, while proponents of 2) claim salience to occur prior any opportunity for agential control. This poses a problem: how can agents be evaluated for salience if it is a passive process? I argue that this tension rests on an incomplete understanding of salience that can be disambiguated through an articulation of how salience is shaped over time. If we understand salience as a learning process, we can accommodate both intuitions without tension.",
  },
  {
    title: "Affect in Action",
    source: "Australasian Journal of Philosophy",
    reference: "",
    date: "forthcoming",
    author: "Glasser & Irving",
    document: "/documents/affect_in_action.pdf",
    abstract:
      `Obsessive thinking is a problem case for the philosophy of mental action, insofar as it both (1) feels passive but (2) manifests our agency. Our solution to this "Puzzle of Obsessive Thinking" rests on a fundamental distinction between what we call "occurrent" and "aggregative" agency. Occurrent agency reflects the agent's capacity to guide her current behavior and thoughts as they unfold over time. We argue that obsessive thinking is a form of occurrent mental agency, since the agent's attention is guided at the personal level, endorsed, and resistible. Our paper's first contribution is therefore to argue for the heterodox views that obsessive thinking is active and, thus, for a de-intellectualized, emotional, form of action. Why, then, do obsessive thoughts feel passive? We argue that this is because they undermine aggregative agency. Aggregative agency reflects the agent's capacity to organize and distribute her actions over time. Although each episode of obsessive thinking is guided, the sheer frequency of those episodes undermines the agent's ability to organize her mental actions. Obsessive thinking is therefore occurrently active but aggregatively passive. Our paper's second contribution is therefore to use obsessive thinking as a wedge to pry these forms of agency apart.`,
  },
  {
    title: "Mind-wandering: A philosophical guide",
    source: "Philosophy Compass",
    reference: "",
    author: "Irving,Glasser",
    date: "2020",
    document: "/documents/mind_wandering.pdf",
    documentName:
      "irving & glasser (2020) mind wandering - a philosophical guide.pdf",
    abstract:
      "Philosophers have long been fascinated by the stream of consciousness – thoughts, images, and bits of inner speech that dance across the inner stage. Yet for centuries, such 'mind-wandering' was deemed private and thus resistant to empirical investigation. Recent developments in psychology and neuroscience have reinvigorated scientific interest in the stream of thought. Despite this flurry of progress, scientists have stressed that mind-wandering research requires firmer philosophical foundations. The time is therefore ripe for the philosophy of mind-wandering. Our review begins with a foundational question: What is mind-wandering? We then investigate the significance of mind-wandering for general philosophical topics, namely, mental action, introspection, and the norms of thinking and attention.",
  },
  {
    title: "The Catch-22 of Forgetfulness: Responsibility for Mental Mistakes",
    source: "Australasian Journal of Philosophy",
    reference: "",
    author: "Irving,Murray,Glasser,Krasich",
    date: "2023",
    document: "/documents/catch_22.pdf",
    documentName:
      "irving et al (2023) The Catch-22 of Forgetfulness Responsibility for Mental Mistakes.pdf",
    abstract:
      "Attribution theorists assume that character information informs judgments of blame. But there is disagreement over why. One camp holds that character information is a fundamental determinant of blame. Another camp holds that character information merely provides evidence about the mental states and processes that determine responsibility. We argue for a two-channel view, where character simultaneously has fundamental and evidential effects on blame. In two large factorial studies (n = 495), participants rate whether someone is blameworthy when he makes a mistake (burns a cake or misses a bus stop). Although mental state inferences predict blame judgments, character information does not. Using mediation analyses, we find that character information influences responsibility via two channels (Studies 3–4; n = 447), which are sensitive to different kinds of information (Study 5; n = 149). On the one hand, forgetfulness increases judgments of responsibility, because mental lapses manifest an objectionable character flaw. On the other hand, forgetfulness decreases judgments of state control, which in turn decreases responsibility judgments. These two channels cancel out, which is why we find no aggregate effect of forgetfulness on responsibility. Our results challenge several fundamental assumptions about the role of character information in moral judgment, including that good character typically mitigates blame.",
  },
  {
    title:
      "The shower effect: Mind wandering facilitates creative incubation during moderately engaging activities",
    source: "Psychology of Aesthetics, Creativity, and the Arts",
    reference: "",
    author: "Irving,McGrath,Flynn,Glasser,Mills",
    date: "2022",
    document: "/documents/shower_effect.pdf",
    documentName: "irving et al (2022) the shower effect.pdf",
    abstract:
      "People often seem to generate creative ideas during moderately engaging activities, such as showering or walking. One explanation of this shower effect is that creative idea generation requires a balance between focused, linear thinking (which limits originality) and unbounded, random associations (which are rarely useful). Activities like walking may help us strike this balance by allowing mind wandering in an engaging environment that places some constraints on thought. Although past studies have found an inconsistent relationship between mind wandering and creative idea generation, they have two limitations. First, creativity researchers have not studied a key form of mind wandering, which is freely moving thought. Second, studies have used boring tasks that may encourage unconstrained and unproductive mind wandering. To overcome these limitations, we investigate the relationship between idea generation and freely moving mind wandering during boring versus engaging video tasks. Across two studies, we find that mind wandering leads to more creative ideas, but only during moderately engaging activities. Boring activities lead to either more ideas or more semantically distant ideas overall, but these effects were unrelated to mind wandering. Boring activities may therefore lead to ideas by affording time for focused problem solving, whereas engaging activities may do so by encouraging productive mind wandering.",
  },
  {
    title:
      "Will-powered: Synchronic regulation is the difference maker for self-control",
    source: "Cognition",
    reference: "",
    author: "Irving,Bridges,Glasser,Bermúdez,Sripada",
    date: "2022",
    document: "/documents/will_powered.pdf",
    documentName: "irving et al (2022) will-powered.pdf",
    abstract:
      "Philosophers, psychologists, and economists have reached the consensus that one can use two different kinds of regulation to achieve self-control. Synchronic regulation uses willpower to resist current temptation. Diachronic regulation implements a plan to avoid future temptation. Yet this consensus may rest on contaminated intuitions. Specifically, agents typically use willpower (synchronic regulation) to achieve their plans to avoid temptation (diachronic regulation). So even if cases of diachronic regulation seem to involve self-control, this may be because they are contaminated by synchronic regulation. We therefore developed a novel multifactorial method to disentangle synchronic and diachronic regulation. Using this method, we find that ordinary usage assumes that only synchronic––not diachronic––regulation counts as self-control. We find this pattern across four experiments involving different kinds of temptation, as well as a paradigmatic case of diachronic regulation based on the classic story of Odysseus and the Sirens. Our final experiment finds that self-control in a diachronic case depends on whether the agent uses synchronic regulation at two moments: when she (1) initiates and (2) follows-through on a plan to resist temptation. Taken together, our results strongly suggest that synchronic regulation is the sole difference maker in the folk concept of self-control.",
  },
  {
    title:
      `What Does "Mind-Wandering" Mean to the Folk? An Empirical Investigation`,
    source: "Cognitive Science",
    reference: "",
    author: "Irving,Glasser,Gopnik,Pinter,Sripada",
    date: "2020",
    document: "/documents/folk.pdf",
    documentName: "irving et al (2020) what does mw mean to the folk.pdf",
    abstract:
      `Although mind-wandering research is rapidly progressing, stark disagreements are emerging about what the term "mind-wandering" means. Four prominent views define mind-wandering as (a) task-unrelated thought, (b) stimulus-independent thought, (c) unintentional thought, or (d) dynamically unguided thought. Although theorists claim to capture the ordinary understanding of mind-wandering, no systematic studies have assessed these claims. Two large factorial studies present participants (N = 545) with vignettes that describe someone's thoughts and ask whether her mind was wandering, while systematically manipulating features relevant to the four major accounts of mind-wandering. Dynamics explains between four and 40 times more variance in participants' mind-wandering judgments than other features. Our third study (N = 153) tests and supports a unique prediction of the dynamic framework—obsessive rumination contrasts with mind-wandering. Our final study (N = 277) used vignettes that resemble mind-wandering experiments. Dynamics had significant and large effects, while task-unrelatedness was nonsignificant. These results strongly suggest that the central feature of mind-wandering is its dynamics.`,
  },
];

const existingVideos = [
  { vimeoId: 1123952777, title: "samples" },
  { vimeoId: 536249576, title: "restricted parking" },
  { vimeoId: 588095101, title: "GIZZARDS" },
  { vimeoId: 507764924, title: "grounds" },
  { vimeoId: 381285830, title: "festering about" },
  { vimeoId: 492353456, title: "MAXIMUS" },
  { vimeoId: 372683896, title: "grasping for all that there is" },
  { vimeoId: 374091560, title: "wax notes" },
  { vimeoId: 390122521, title: "[i]" },
  { vimeoId: 375638891, title: "dorveille" },
  { vimeoId: 374088455, title: "JALOPY" },
  { vimeoId: 371956495, title: "a portrait in the noise" },
  { vimeoId: 371278595, title: "90" },
  { vimeoId: 375657961, title: "Hayloft (installation)" },
  { vimeoId: 371958517, title: "mentality" },
  { vimeoId: 375639958, title: "samsa" },
  { vimeoId: 371956752, title: "Ochre Dust" },
  { vimeoId: 375645607, title: "shull silo#8(last)" },
];

const existingSiteContent = [
  {
    key: "site_title",
    value: "Aaron Glasser",
    label: "Site Title",
  },
  {
    key: "bio_heading",
    value: "Aaron Glasser",
    label: "Bio Page Heading",
  },
  {
    key: "bio_text",
    value:
      "I am currently a PhD candidate in the philosophy department at the University of Michigan. My broad research interests include philosophy of mind, action, moral psychology, cognitive science, and nonwestern philosophy. These usually lead me to questions about attention and agency, with a special focus on our relationship with what is salient to us. Outside of academia, I like to make/curate movies.",
    label: "Bio Text",
  },
  {
    key: "email",
    value: "agmail@umich.edu",
    label: "Email Address",
  },
];

async function main() {
  console.log("Starting seed...");

  // Seed writings
  console.log("Seeding writings...");
  for (const writing of existingWritings) {
    await db.insert(writings).values(writing).onConflictDoNothing();
  }

  // Seed videos
  console.log("Seeding videos...");
  for (const video of existingVideos) {
    await db.insert(videos).values(video).onConflictDoNothing();
  }

  // Seed site content
  console.log("Seeding site content...");
  for (const content of existingSiteContent) {
    await db
      .insert(siteContent)
      .values(content)
      .onConflictDoUpdate({ target: siteContent.key, set: { value: content.value, label: content.label } });
  }

  console.log("Seed complete!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed!");
  console.error(err);
  process.exit(1);
});
