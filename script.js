const sample = `def calculate_average(numbers):
    total = 0
    for n in numbers:
        total += n
    return total / len(numbers)

values = [10, 20, 30, 40]
print(calculate_average(values))`;

const input = document.getElementById("codeInput");
const result = document.getElementById("result");
const lineCount = document.getElementById("lineCount");
const status = document.getElementById("status");

function updateLines() {
  const n = input.value ? input.value.split("\n").length : 0;
  lineCount.textContent = `${n} line${n === 1 ? "" : "s"}`;
}
input.addEventListener("input", updateLines);
document.getElementById("loadSample").addEventListener("click", () => {
  input.value = sample;
  updateLines();
});

document.getElementById("analyzeBtn").addEventListener("click", () => {
  if (!input.value.trim()) {
    result.innerHTML = `<div class="empty-state"><div class="empty-icon">!</div><h3>Add some code first</h3><p>Paste a code snippet and run the AI analysis.</p></div>`;
    return;
  }

  status.textContent = "Analyzing…";
  result.innerHTML = `<div class="empty-state"><div class="empty-icon">✦</div><h3>AI is reviewing your code</h3><p>Checking structure, edge cases and code quality…</p></div>`;

  setTimeout(() => {
    status.textContent = "Complete";
    result.innerHTML = `
      <div class="ai-result">
        <span class="pill">AI REVIEW COMPLETE</span>
        <h3>Summary</h3>
        <p style="color:#9ba7bd;font-size:.83rem">
          The function is simple and readable, but it needs an edge-case check before
          it can safely handle every input.
        </p>
        <div class="finding">
          <strong>⚠️ Potential edge case</strong>
          <p>If <code>numbers</code> is empty, division by zero can occur. Consider handling empty input explicitly.</p>
        </div>
        <div class="finding">
          <strong>✓ Readability</strong>
          <p>The variable names are clear and the loop is easy to understand.</p>
        </div>
        <div class="finding">
          <strong>💡 Improvement</strong>
          <p>Python's built-in <code>sum()</code> can make the calculation shorter while keeping the intent clear.</p>
        </div>
        <div class="finding">
          <strong>🧪 Suggested tests</strong>
          <p>Normal list • single value • decimal values • empty list • negative values</p>
        </div>
      </div>`;
  }, 900);
});

updateLines();
