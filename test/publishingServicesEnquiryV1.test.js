const {test} = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const read = path => fs.readFileSync(path,"utf8");

test("bilingual publishing overview uses the existing enquiry and Help routes", () => {
  const s=read("components/PublishingServicesV1.tsx");
  for(const route of ["/contact?topic=publishing#contact-form","/fr/contact?topic=publishing#contact-form","/help#publishing-services","/fr/help#publishing-services"]) assert.ok(s.includes(route),route);
  assert.ok(s.includes("First-time authors are welcome."));
  assert.ok(s.includes("Your work remains yours."));
  assert.ok(!s.includes("royalties"));
  assert.ok(!s.includes("<form"));
});
test("publishing-specific contact reuses the existing payload and editable subject", () => {
  for(const path of ["app/contact/page.tsx","app/fr/contact/page.tsx"]){
    const s=read(path);
    assert.match(s,/get\("topic"\) === "publishing"/);
    assert.ok(s.includes("setPublishingEnquiry(true)"));
    assert.ok(s.includes("setSubject(current => current ||"));
    assert.ok(s.includes("onChange={e => setSubject(e.target.value)}"));
    assert.ok(s.includes('fetch(`${API_URL}/api/contact`'));
    assert.equal((s.match(/<form onSubmit={onSubmit}>/g)||[]).length,1);
    for(const name of ["name","email","subject","message","honey"]) assert.ok(s.includes('name="'+name+'"'));
    assert.ok(s.includes("!publishingEnquiry && <>"));
    assert.ok(s.includes("publishingEnquiry ?"));
    assert.ok(s.includes('id="contact-form"'));
    assert.ok(!s.includes('type="file"'));
  }
});
test("Help keeps publishing guidance in an existing accordion and preserves approval boundaries", () => {
  const s=read("components/HelpOnDemand.tsx");
  assert.equal((s.match(/id: "publishing-services"/g)||[]).length,2);
  assert.ok(s.includes("id={topic.id}"));
  assert.ok(s.includes("<details className={styles.topic}"));
  assert.ok(s.includes("before any binding commitment"));
  assert.ok(s.includes("explicit approval"));
  assert.ok(s.includes("does not transfer rights or authorize publication"));
  assert.ok(s.includes("First Reads is a separate optional pathway"));
  assert.ok(s.includes("avant tout engagement contractuel"));
  assert.ok(s.includes("autorisation expresse"));
});
