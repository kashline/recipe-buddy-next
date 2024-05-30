export default function friendifyWords(words: string){
    return words.split("")[0] 
        ?
        words.split(" ").map((word: string) => {return `${word[0].toUpperCase()}${word.substring(1)}`}).join(" ")
        :
        words
}