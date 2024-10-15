import ollama from 'ollama'

const result = await ollama.generate({
  model: 'llama3.1',
  prompt: 'say hi',
})

console.log(result.response)