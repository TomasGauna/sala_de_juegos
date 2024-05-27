import { Component, Input } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent 
{
  @Input() isChatOpen = false;
  @Input() email = '';

  isDragging = false;
  isSelectingText = false;
  initialX: number = 0;
  initialY: number = 0;
  chatPosition = { x: 15, y: 160 };
  mensajesCargados: any[] = [];
  mensaje = '';

  constructor(private firestore: Firestore) {}

  ngOnInit() 
  {
    FirestoreService.traerFs('mensajes', this.firestore, true).then((data)=>
    {
      this.mensajesCargados = data;
    });
  }

  enviar()
  {
    if(this.mensaje != '')
    {
      let params = FirestoreService.guardarFs('mensajes', this.email, this.firestore, this.mensaje);

      this.mensajesCargados.push(params);

      this.mensaje = '';
    }
  }

  esUsuarioLogueado(usuario: string): boolean 
  {
    return usuario === this.email;
  }

  abrirChat()
  {
    if(this.email)
    {
      this.isChatOpen = !this.isChatOpen;
    }
  }

  startDragging(event: MouseEvent) {
    if (this.isChatOpen) {
      this.isDragging = true;
      this.initialX = event.clientX - this.chatPosition.x;
      this.initialY = event.clientY - this.chatPosition.y;
    }
  }

  stopDragging() {
    this.isDragging = false;
  }

  drag(event: MouseEvent) {
    if (this.isDragging) {
      this.chatPosition.x = event.clientX - this.initialX;
      this.chatPosition.y = event.clientY - this.initialY;
    }
  }
}
