const handleSubmit = async () => {
  setLoading(true);
  setOutput('');

  try {
    if (!window.puter || !window.puter.ai || !window.puter.ai.chat) {
      setOutput('❌ Puter.js is not loaded. Please refresh or check your internet connection.');
      setLoading(false);
      return;
    }

    const response = await window.puter.ai.chat(
      `Find bugs in this code:\n\n${code}`,
      { model: 'deepseek-coder' } // ✅ safer model, no login required
    );

    setOutput(response);
  } catch (err) {
    console.error('AI error:', err);
    setOutput('❌ Error occurred while analyzing the code.');
  } finally {
    setLoading(false);
  }
};






