import React from 'react'
import {Text} from 'react-native'

/**
 * Find instances of $0 $1 $2 etc from a template string and replace with
 * the value given as a replacement.
 * $0 will be replaced with the first replacement argument, $1 with the second etc.
 *
 * @returns Array of text components for use with React
 *
 * @param template {String}
 * @param ...replacements {Node}
 */
export default (template, ...replacements) => {
  let regex = /(\$[0-9])/g
  let parts = template.split(regex)
  return parts.map((part, i) => {
    if(part.match(regex)){
      let index = part.substr(1)
      return <Text key={i}>{replacements[index]}</Text>
    }else{
      return <Text key={i}>{part}</Text>
    }
  })
}
