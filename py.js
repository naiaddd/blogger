<script src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"></script>
<script>
  async function runPythonScript() {
    let pyodide = await loadPyodide();
    let result = await pyodide.runPythonAsync(`
      print("Hello from Python in the browser!")
    `);
    console.log(result);
  }
  runPythonScript();
</script>
