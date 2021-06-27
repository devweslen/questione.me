import { ReactNode } from "react"
import cn from "classnames"

import "./styles.scss"

type QuestionProps = {
  content: string,
  author: {
    name: string,
    avatar: string
  },
  children?: ReactNode,
  isHighlighted: boolean,
  isAnswared: boolean
}

export function Question({ content, author, children, isAnswared = false,  isHighlighted = false }: QuestionProps){
  return (
    <div 
      className={cn(
        "question", 
        { answared: isAnswared },
        { highlighted: isHighlighted && !isAnswared }
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  )
}