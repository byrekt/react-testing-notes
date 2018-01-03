import toPigLatin from './Lesson3'


describe('toPigLatin', () => {
  expect.hasAssertions()
})




























































































// describe('toPigLatin', () => {
//   expect.hasAssertions()
//   it('converts a word that starts with a consonant to pig latin', () => {
//     expect(toPigLatin('leer')).toMatchSnapshot()
//   })
//   it('converts a word that starts with multiple consonants to pig latin', () => {
//     expect(toPigLatin('cheer')).toMatchSnapshot()
//   })
//   it('converts a word that starts with a vowel to pig latin', () => {
//     expect(toPigLatin('apple')).toMatchSnapshot()
//   })
//   it('doesn\'t modify a string without any vowels in it', () => {
//     expect(toPigLatin('mrglmrglmrglmrgl')).toMatchSnapshot()
//   })
//   it('converts multiple words to pig latin', () => {
//     expect(toPigLatin('I cheer for the apple king mm-hmmm')).toMatchSnapshot()
//   })
//   it('just returns thet argument if it\'s not a string', () => {
//     expect(toPigLatin(72)).toMatchSnapshot()
//   })
// })