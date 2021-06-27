import { useHistory, useParams } from "react-router-dom"
import { toast, Toaster } from "react-hot-toast"

import './styles.scss'

import logoImg from '../../assets/images/logo.svg'
import deleteImg from '../../assets/images/delete.svg'
import checkImg from '../../assets/images/check.svg'
import answerImg from '../../assets/images/answer.svg'

import { useRoom } from "../../hooks/useRoom"
import { database } from "../../services/firebase"

import { Button } from "../../components/Button"
import { RoomCode } from "../../components/RoomCode"
import { Question } from "../../components/Question"

type RoomParams = {
  id: string
}

export function AdminRoom(){
  const history = useHistory()
  const params = useParams<RoomParams>()
  const roomId = params.id

  const { questions, title } = useRoom(roomId)

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    })

    history.push("/")
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database
    .ref(`rooms/${roomId}/questions/${questionId}`)
    .update({
      isAnswared: true
    })
  }

  async function handleHighlightQuestion(questionId: string) {
    await database
    .ref(`rooms/${roomId}/questions/${questionId}`)
    .update({
      isHighlighted: true
    })
  }

  async function handleDeleteQuestion(questionId: string) {
    if(window.confirm("Tem certeza que você deseja excluir esta pergunta?")){
      await database
      .ref(`rooms/${roomId}/questions/${questionId}`)
      .remove()

      toast.success("Questão deletada com sucesso!", {
        style: {
          background: '#014F86',
          color: '#fff'
        }
      })
    }
  }

  return (
    <div id="page-admin-room">
      <Toaster />
      <header>
        <div className="content">
          <img src={logoImg} alt="LetMeAsk" />
          <div>
            <RoomCode code={roomId}></RoomCode>
            <Button 
              onClick={handleEndRoom} 
              isOutlined
            >
                <img src={deleteImg} alt="Deletar sala" />
                <span>Encerrar sessão</span>
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h2><strong>Sala:</strong> {title}</h2>
          {
            questions.length > 0 && (
              <div>{questions.length} <span>pergunta(s)</span></div>
            ) 
          }
        </div>

        <div className="question-list">
          {questions.map((question) => { return (
            <Question 
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswared={question.isAnswared}
              isHighlighted={question.isHighlighted}
            >
              { !question.isAnswared && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                  >
                    <img src={checkImg} alt="Marcar perguntar como respondida" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleHighlightQuestion(question.id)}
                  >
                    <img src={answerImg} alt="Dar destaque a perguntar" />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt="Deletar questão" />
              </button>
            </Question>
          )})}
        </div>
      </main>
    </div>
  )
}