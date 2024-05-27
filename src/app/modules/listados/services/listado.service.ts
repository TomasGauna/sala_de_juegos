import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, query, orderBy, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ListadoService {

  constructor(private firestore: Firestore) { }

  guardarResultado(obj:any, col: string)
  {
    let options : any = { timeZone: 'America/Argentina/Buenos_Aires'};
    let fechaHora = new Date().toLocaleString('es-AR', options);
    let coleccion = collection(this.firestore, col);
    return addDoc(coleccion, {...obj, fecha: fechaHora});
  }

  async traerListado(col: string)
  {
    const colRef = collection(this.firestore, col);
    let q = query(colRef);
    
    try 
    {
      const querySnapshot = await getDocs(q);
      const data: any[] = [];

      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });

      return data;
    } 
    catch (error) 
    {
      console.error('Error al obtener datos de Firestore:', error);
      throw error;
    }
  }
}
