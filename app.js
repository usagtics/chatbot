require('dotenv').config();
const axios = require('axios');
const { 
    createBot,
    createProvider, 
    createFlow, 
    addKeyword 
} = require('@bot-whatsapp/bot');

const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');

const flujoMenu = addKeyword(['menu', 'opciones','menú'])
    .addAnswer(
        "🌟 *Bienvenido al Menú Principal* 🌟\n\n" +
        "Selecciona una opción escribiendo el número correspondiente:\n\n" +
        "1️⃣ Oferta Académica\n2️⃣ Inscripciones y Costos\n3️⃣ Titulación\n4️⃣ Trámites y Documentación\n5️⃣ Contacto y Soporte\n\n" +
        "Escribe el número de la opción para más detalles. Ejemplo: *1*"
    );

const flujoOfertaAcademica = addKeyword(['1'])
    .addAnswer(
        "📚 *Oferta Académica*\n" +
        "Tenemos las siguientes opciones:\n\n" +
        "🔹 *Auxiliar de Enfermería*\n" +
        "🔹 *Licenciatura en Enfermería*\n" +
        "🔹 *Preparatoria General*\n\n" +
        "Escribe el nombre de la opción para más detalles. Ejemplo: *Auxiliar*\n\n" +
        "Si deseas regresar al menú principal, escribe *menu*."
    );
    const flujoAuxiliarEnfermeria = addKeyword(['auxiliar', 'auxiliar de enfermería'])
    .addAnswer(
        "🏥 *Auxiliar en Enfermería* 🌿\n\n" +
        "¿Te apasiona ayudar a los demás? Conviértete en *Auxiliar en Enfermería* y comienza tu camino en el sector salud. ✨\n\n" +
        "📆 *Duración:* 11 meses\n\n" +
        "📝 *Requisitos para tu inscripción:*\n" +
        "🔹 Acta de nacimiento (original + 2 copias)\n" +
        "🔹 2 copias de tu CURP\n" +
        "🔹 2 copias de tu INE\n" +
        "🔹 Certificado de preparatoria\n" +
        "🔹 8 fotografías tamaño infantil (en blanco y negro, fondo blanco, camisa blanca y papel mate)\n" +
        "🔹 2 copias de tu comprobante de domicilio\n" +
        "🔹 Certificado médico (incluyendo tipo de sangre)\n\n" +
        "📅 *Inscripciones abiertas cada semestre*.\n\n" +
        "🧑‍⚕️ ¡No pierdas la oportunidad de comenzar una carrera que marcará la diferencia en la vida de muchas personas! 💙",
        { media: 'https://beige-camel-924911.hostingersite.com/wp-content/uploads/2025/02/auxenf.jpg' }
    );




const flujoLicEnfermeria = addKeyword(['licenciatura', 'licenciatura en enfermería'])
    .addAnswer(
        "🎓 *Licenciatura en Enfermería* 💉\n\n" +
        "¡Prepárate para ser parte de un sector que transforma vidas! La *Licenciatura en Enfermería* te brindará los conocimientos necesarios para cuidar de la salud de las personas. 🩺\n\n" +
        "📆 *Duración:* 4 años (dependiendo del horario elegido)\n\n" +
        "📝 *Requisitos:\n" +
        "📄 *Documentos necesarios:*\n" +
        "- Certificado de preparatoria\n" +
        "- Acta de nacimiento original + 2 copias\n" +
        "- 2 copias del CURP\n" +
        "- 2 copias del INE\n" +
        "- 8 fotografías tamaño infantil (blanco/negro, fondo blanco, camisa blanca, papel mate)\n" +
        "- 2 copias de comprobante de domicilio\n" +
        "- Certificado médico que incluya tipo de sangre\n\n" +
        "🕒 *Modalidades de estudio:*\n" +
        " 1️⃣ *Horario sabatino* (Solo los sábados) 📅\n" +
        "    *Duración:* 5 años ⏳\n" +
        " 2️⃣ *Horario semanal* (Lunes a viernes) ⏰\n" +
        "    *Duración:* 4 años ⏳\n\n" +
        "📅 *Inscripciones abiertas cada semestre*.\n\n" +
        "¡Da el siguiente paso hacia una carrera con futuro y mucha vocación! 💙",
        { media: 'https://beige-camel-924911.hostingersite.com/wp-content/uploads/2025/02/9800aeda-4648-4e2e-a542-a03434c5d959.jpg' }
    );

const flujoPreparatoria = addKeyword(['preparatoria', 'preparatoria general'])
    .addAnswer(
        "📖 *Preparatoria General* 🎓\n\n" +
        "¡Inicia tu camino hacia el éxito con nuestra *Preparatoria General*! 🎓\n\n" +
        "📆 *Duración:* 3 años\n\n" +
        "📝 *Requisitos:* Certificado de secundaria\n" +
        "📄 *Documentos necesarios:*\n" +
        "- Acta de nacimiento original + 2 copias\n" +
        "- 2 copias del CURP\n" +
        "- 2 copias del INE (del padre o el tutor)\n" +
        "- 8 fotografías tamaño infantil (blanco/negro, fondo blanco, camisa blanca, papel mate)\n" +
        "- 2 copias de comprobante de domicilio\n" +
        "- Certificado médico que incluya tipo de sangre\n\n" +
        "🕒 *Horario de estudio:*\n" +
        " 1️⃣ *Horario semanal* (Lunes a viernes) ⏰\n\n" +
        "📅 *Inscripciones abiertas en agosto y enero*.\n\n" +
        "¡Este es tu momento para avanzar en tu educación y alcanzar tus metas! 🚀",
        {media: 'https://beige-camel-924911.hostingersite.com/wp-content/uploads/2025/02/Captura-de-pantalla-2025-02-26-110612.png'}
    );

const flujoInscripcionesCostos = addKeyword(['2'])
    .addAnswer(
        "📝 *Inscripciones y Costos*\n\nLas inscripciones están abiertas en enero y agosto.\nCostos varían según la carrera. Para ver los costos por carrera, selecciona una opción:\n\n" +
        "🔹 *Auxiliar de Enfermería* (Escribe *costos aux*)\n" +
        "🔹 *Licenciatura en Enfermería* (Escribe *costos lic*)\n" +
        "🔹 *Preparatoria General* (Escribe *costos prepa*)\n\n" +
        "Si deseas regresar al menú principal, escribe *menu*."
    );

// Flujo para los costos específicos de cada carrera
const flujoCostosAuxiliar = addKeyword(['costos aux'])
    .addAnswer(
        "🏥 *Costos para Auxiliar en Enfermería*\n\n" +
        "💰 *Costos:*\n" +
        "🔹 Ficha de inscripción: $500\n" +
        "🔹 Inscripción: $1,850\n" +
        "🔹 Mensualidad con preparatoria: $1,900\n" +
        "🔹 Mensualidad sin preparatoria: $1,500\n" +
        "🔹 Costo de trámite final: $4,000\n\n" +
        "📅 *Duración:* 10 meses académicos + 1 mes de preparación para la certificación\n\n" +
        "📍 *Horarios disponibles:*\n" +
        "🔹 Sábados o Domingos: 8:00 a.m. - 3:00 p.m.\n" +
        "🔹 Martes y Jueves: 8:00 a.m. - 3:00 p.m.\n" +
        "🔹 Miércoles: 4:00 p.m. - 9:00 p.m.\n\n" +
        "📌 *Notas:*\n" +
        "✅ Si solo tienes secundaria y deseas cursar preparatoria, el horario será de 8:00 a.m. a 3:00 p.m.\n" +
        "✅ Si ya terminaste la preparatoria, el horario será de 8:00 a.m. a 2:00 p.m.\n\n" 
    );


    const flujoCostosLicEnfermeria = addKeyword(['costos lic'])
    .addAnswer(
        "🎓 *Licenciatura en Enfermería Escolarizada* 🏥\n\n" +
        "📚 *Duración:* 4 años académicos + 1 año de servicio\n" +
        "📆 *Clases:* Lunes a viernes de 8:00 am a 2:30 pm\n" +
        "📜 *Entrega:* Cédula y Título\n" +
        "✅ *RVOE:* 20221717 Federal\n" +
        "👥 *Grupos:* Reducidos\n\n" +
        "💰 *COSTOS:*\n" +
        "🔹 *Ficha:* $500\n" +
        "🔹 *Examen:* $300\n" +
        "🔹 *Inscripción:* $3,000\n" +
        "🔹 *Propedéutico:* $2,600\n" +
        "🔹 *Reinscripción cuatrimestral:* $2,000\n" +
        "🔹 *Mensualidad:* $4,750\n\n" +
        "‼️ *Cupo limitado* ‼️\n\n" +
        "Para más detalles, contacta con el departamento de inscripciones."
    );


    const flujoCostosPreparatoria = addKeyword(['costos prepa'])
    .addAnswer(
        "📖 *Costos para Bachillerato + Laboratorios Especializados*\n\n" +
        "🔹 *Duración:* 6 semestres (3 años)\n" +
        "🔹 *Clases:* Presenciales de lunes a viernes\n" +
        "🔹 *Horario:* 8:00 a.m. a 1:30 p.m.\n\n" +
        "*Laboratorios Especializados:*\n" +
        "💉 Enfermería\n" +
        "🩻 Radiología\n" +
        "🛞 Mecánica Automotriz\n" +
        "🤖 Mecatrónica\n\n" +
        "*Costos:*\n" +
        "🔹 Ficha de inscripción: $500\n" +
        "🔹 Examen: $300\n" +
        "🔹 Inscripción: $1,500 (Descuento del 20% = $1,200)\n" +
        "🔹 Reinscripción: $1,500\n" +
        "🔹 Mensualidad: $1,500\n\n" +
        "📌 *Clave de Centro de Trabajo:* 11PBH0346Q (Incorporado a la SEG)\n\n" +
        "Para más información sobre inscripciones y pagos, comunícate con el departamento de inscripciones. 📩"
    );


    const flujoTramites = addKeyword(['4'])
    .addAnswer(
        "📝 *Tramites Escolares*\n\nLas inscripciones están abiertas en enero y agosto.\nCostos varían según la carrera. Para ver los costos por carrera, selecciona una opción:\n\n" +
        "🔹 *Constancias* (Escribe *constancias*)\n" +
        "🔹 *cardets* (Escribe *cardets*)\n" +
        "🔹 *credencial* (Escribe *credencial*)\n\n" +
        "Si deseas regresar al menú principal, escribe *menu*."
    );




    const flujoTramiteDoc = addKeyword(['constancias'])
    .addAnswer(
        "📜 *Solicitud de Constancias* 📜\n\n" +
        "Para solicitar una constancia, debes cumplir con los siguientes requisitos:\n\n" +
        "✅ Estar inscrito en la institución.\n" +
        "✅ No tener adeudos pendientes.\n\n" +
        "💰 *Costo:* $200\n\n" +
        "📌 Para solicitar el pago en efectivo o por transferencia, por favor envía un correo a:\n" +
        "📩 *auxiliar.admin@usaguanajuato.edu.mx*\n\n" +
        "Si necesitas más información, no dudes en preguntar. 😊"+
        "Si deseas regresar al menú principal, escribe *menu*."

    );

    const flujoTramitecardets = addKeyword(['cardets'])
    .addAnswer(
        "📜 *Solicitud de Constancias* 📜\n\n" +
        "Para solicitar una constancia, debes cumplir con los siguientes requisitos:\n\n" +
        "✅ Estar inscrito en la institución.\n" +
        "✅ No tener adeudos pendientes.\n\n" +
        "💰 *Costo:* $500\n\n" +
        "📌 Para solicitar el pago en efectivo o por transferencia, por favor envía un correo a:\n" +
        "📩 *auxiliar.admin@usaguanajuato.edu.mx*\n\n" +
        "Si necesitas más información, no dudes en preguntar. 😊"+
        "Si deseas regresar al menú principal, escribe *menu*."

    );
const flujoTramiteCreden = addKeyword(['credencial'])
    .addAnswer(
        "📜 *Solicitud de Constancias* 📜\n\n" +
        "Para solicitar una constancia, debes cumplir con los siguientes requisitos:\n\n" +
        "✅ Estar inscrito en la institución.\n" +
        "✅ No tener adeudos pendientes.\n\n" +
        "💰 *Costo:* $150\n\n" +
        "📌 Para solicitar el pago en efectivo o por transferencia, por favor envía un correo a:\n" +
        "📩 *auxiliar.admin@usaguanajuato.edu.mx*\n\n" +
        "📎 *Manual de USAG Credencial Alumno:*\n" +
        "[Ver Manual](https://view.genially.com/67bf64271c8840bbca749d38/presentation-manual-de-usagcredencialalumno)\n\n" +
        "Si necesitas más información, no dudes en preguntar. 😊\n\n" +
        "Si deseas regresar al menú principal, escribe *menu*."
    );


    const flujoContacto = addKeyword(['5'])
    .addAnswer(
        "📞 *Contacto y Soporte* 📞\n\n" +
        "Si necesitas más información, puedes comunicarte con nosotros en cualquiera de nuestros planteles:\n\n" +
        "🏫 *Planteles Disponibles:*\n\n" +
        "📍 *Plantel Cuba*\n" +
        "   📌 Dirección: C. República de Cuba 201, Bellavista, 37360 León de los Aldama, Gto.\n" +
        "   📞 Teléfono: 477 399 6169\n" +
        "   📩 Correo: vinculacion.cuba@usaguanajuato.edu.mx\n\n" +
        "📍 *Plantel Veracruz*\n" +
        "   📌 Dirección: Calle Veracruz #404, Col. Arbide, León, Gto.\n" +
        "   📞 Teléfono: 477 627 5033\n\n" +
        "   📩 Correo: vinculacion.veracruz@usaguanajuato.edu.mx\n\n" +
        "📍 *Plantel Centenario*\n" +
        "   📌 Dirección: Centenario #345-D, Col. San Miguel, León, Gto.\n" +
        "   📞 Teléfono: 477 808 4556\n\n" +
        "   📩 Correo: 	vinculacion.centenario@usaguanajuato.edu.mx \n\n" +
        "📍 *Plantel Centro*\n" +
        "   📌 Dirección: Portal Hidalgo #5, Centro, León, Gto.\n" +
        "   📞 Teléfono: 477 716 6129\n\n" +
        "   📩 Correo: vinculacion.centro@usaguanajuato.edu.mx	\n\n" +
        "📆 *Atención en línea disponible*."+
        "Si deseas regresar al menú principal, escribe *menu*."

    );

    const flujoTitulacion = addKeyword(['3'])
    .addAnswer(
        "📜 *Requisitos para Titulación* 📜\n\n" +
        "Para obtener tu título, debes cumplir con los siguientes requisitos:\n\n" +
        "✅ Ser pasante de la Licenciatura.\n" +
        "✅ Como máximo un año posterior al haber concluido sus estudios.\n" +
        "✅ Tener promedio mínimo general de 8 en la Licenciatura.\n" +
        "✅ Cumplir con el servicio social en caso de Licenciatura o cualquier otro requisito obligatorio de su formación académica antes de la conclusión de sus estudios.\n" +
        "✅ Presentar ante el Coordinador de la Licenciatura una constancia de calificaciones y el plan de estudios a cursar para recibir visto bueno.\n" +
        "✅ Para obtener el título, el pasante deberá aprobar el 45% de los créditos de la especialización o maestría que esté cursando.\n" +
        "✅ Presentar por escrito al Coordinador de la Licenciatura la solicitud para asignar la fecha de examen profesional.\n" +
        "✅ El Coordinador de la Licenciatura designará a los sinodales para avalar los estudios y registrar el acta de titulación.\n" +
        "✅ El aspirante se presentará al Examen Profesional, que consistirá únicamente del protocolo en la fecha y hora designadas.\n\n" +
        "Si deseas regresar al menú principal, escribe *menu*."
    );


    const flujoPrincipal = addKeyword(['hola', 'hello', 'alo'])
    .addAnswer(
        "👋 ¡Hola! Soy tu asistente personal de la Universidad de San Andrés de Guanajuato.\n" +
        "Escribe *menu* para ver las opciones disponibles.", 
        { media: 'https://beige-camel-924911.hostingersite.com/wp-content/uploads/2025/02/logo.jpg' }
    );


    const flujoError = addKeyword([]) // Deja vacío para capturar cualquier mensaje no reconocido
    .addAnswer(
        "❌ *Opción no válida* ❌\n\n" +
        "No entiendo tu mensaje. Por favor, selecciona una opción del menú o escribe *menu* para ver las opciones disponibles."
    );

const main = async () => {
    try {
        const adapterDB = new MockAdapter();
        const adapterFlow = createFlow([
            flujoPrincipal, flujoMenu, flujoOfertaAcademica,
            flujoAuxiliarEnfermeria, flujoLicEnfermeria, flujoPreparatoria,
            flujoInscripcionesCostos, flujoContacto, 
            flujoCostosAuxiliar, flujoCostosLicEnfermeria, flujoCostosPreparatoria,
            flujoTramiteDoc, flujoTramites, flujoTramitecardets, flujoTramiteCreden,flujoTitulacion,
            flujoError // Mueve esto al final
        ]);
        
        const adapterProvider = createProvider(BaileysProvider);

        createBot({
            flow: adapterFlow,
            provider: adapterProvider,
            database: adapterDB,
        });

        await QRPortalWeb();  
    } catch (error) {
        console.error('Error en la inicialización del bot:', error);
            
    }
};

main();
