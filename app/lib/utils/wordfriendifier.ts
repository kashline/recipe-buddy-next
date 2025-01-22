export default function friendifyWords(words: string) {
  const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  try {
    return words.split("")[0]
    ? words
        .split(" ")
        .map((word: string) => {
          if (format.test(word[0])) {
            if (word.length === 1){
              return word
            }
            return word.length !== 0
              ? `${word[0]}${word[1].toUpperCase()}${word.substring(2)}`
              : null;
          } else {
            return word.length !== 0
              ? `${word[0].toUpperCase()}${word.substring(1)}`
              : null;
          }
        })
        .join(" ")
    : words;
  } catch (error) {
    console.log(`There was an error in friendifyWords.  The words causing issues are: ${words}`)
  }
}
