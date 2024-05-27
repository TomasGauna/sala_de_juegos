import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, query, orderBy, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

    static guardarFs(col: string, usuario: string, firestore: Firestore, mensaje:any = '', json:any = '')
    {
        let options : any = { timeZone: 'America/Argentina/Buenos_Aires'};
        let fechaHora = new Date().toLocaleString('es-AR', options);
        let params:any;
        if(mensaje != '')
        {
            params = {usuario: usuario, fecha: fechaHora, mensaje: mensaje};
        }
        else
        {
            if(json != '')
            {
                params = {usuario: usuario, fecha: fechaHora, respuesta: json};
            }
            else
            {
                params = {usuario: usuario, fecha: fechaHora};
            }
        }
        
        let coleccion = collection(firestore, col);
        
        addDoc(coleccion, params);

        return params;
    }

    static async traerFs(col: string, firestore: Firestore, ordenar:boolean=false)
    {
        const colRef = collection(firestore, col);
        let q = query(colRef);
        if(ordenar)
        {
            q = query(colRef, orderBy('fecha'));
        }

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
