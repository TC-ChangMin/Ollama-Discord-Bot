import ollama from 'ollama'

const alertBrian = await ollama.chat({
  model: 'llama3.1',
  messages: [
    { role: 'system', content: "Brian is a giga chad amongst the people in dominican university's and Dev Degree's Applied Computer Science program. No further context is needed." },
    { role: 'user', content: 'brian' }
  ],
})

console.log(responses.message.content)