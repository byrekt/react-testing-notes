const toPigLatin = (str) => {
  if (typeof str !== 'string') {
    return str
  }

  const strArray = str.split(' ')
  const pigLatinArray = strArray.map((word) => {
    const firstVowelIndex = findFirstVowelIndex(word)
    // Don't translate if there are no vowels or only the last letter is a vowel
    if (firstVowelIndex === -1) return word
    return `${word.substring(firstVowelIndex)}${word.substring(0, firstVowelIndex)}${firstVowelIndex === 0 ? 'w' : ''}ay`.toLowerCase()
  })

  return pigLatinArray.join(' ')
}

const findFirstVowelIndex = (str) => {
  const strToLower = str.toLowerCase()

  for (let i = 0; i < strToLower.length; ++i) {
    switch (strToLower[i]) {
      case 'a':
      case 'e':
      case 'i':
      case 'o':
      case 'u':
      case 'y':
        return i
    }
  }

  return -1
}

export default toPigLatin