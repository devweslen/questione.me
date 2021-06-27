import copyImg from "../../assets/images/copy.svg"
import { Toaster, toast } from "react-hot-toast"

import './styles.scss'

type RoomCodeProps = {
  code: string
}

export function RoomCode({ code }: RoomCodeProps){
  function copyRoomCodeToClipboard(){
    navigator.clipboard.writeText(code)
    toast("Código da sala copiado!", {
      icon: "👍",
      style: {
        background: '#014F86',
        color: '#fff'
      }
    })
  }

  return (
    <>
      <Toaster />
      <button className="room-code" onClick={copyRoomCodeToClipboard}>
        <div>
          <img src={copyImg} alt="Copy room code" />
        </div>
        <span>Sala #{code}</span>
      </button>
    </>
  )
}