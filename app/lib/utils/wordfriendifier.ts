export default function friendifyWords(words: string){
    return words.split("")[0]
        ?
        words.split(" ").map((word: string) => {
            return word.length !== 0 ? `${word[0].toUpperCase()}${word.substring(1)}` : null
        }).join(" ")
        :
        words
}