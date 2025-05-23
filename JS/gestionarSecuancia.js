/*Este archivo genera los ids autogenerados y los almacena en un solo sitio  */
nombreLocalStore = 'secuencia'

function getValorSecuenciaUsuario(){
    secuencias = getJSONDeLocalStore(nombreLocalStore)
    if (secuencias.length == 0) {
        secuencia = new Secuencia
        secuencias.push(secuencia)

    }
    secuencias[0].autonumeroUsuario += 1

    setJSONDeLocalStore(nombreLocalStore, secuencias)
    return secuencias[0].autonumeroUsuario
}


function getValorSecuenciaCurso(){
    secuencias = getJSONDeLocalStore(nombreLocalStore)
    if (secuencias.length == 0) {
        secuencia = new Secuencia
        secuencias.push(secuencia)

    }
    secuencias[0].autonumeroCurso += 1

    setJSONDeLocalStore(nombreLocalStore, secuencias)
    return secuencias[0].autonumeroCurso
}

function getValorSecuenciaTema(){
    secuencias = getJSONDeLocalStore(nombreLocalStore)
    if (secuencias.length == 0) {
        secuencia = new Secuencia
        secuencias.push(secuencia)

    }
    secuencias[0].autonumeroTema += 1

    setJSONDeLocalStore(nombreLocalStore, secuencias)
    return secuencias[0].autonumeroTema
}

function getValorSecuenciaEjercicio(){
    secuencias = getJSONDeLocalStore(nombreLocalStore)
    if (secuencias.length == 0) {
        secuencia = new Secuencia
        secuencias.push(secuencia)

    }
    secuencias[0].autonumeroEjercicio += 1

    setJSONDeLocalStore(nombreLocalStore, secuencias)
    return secuencias[0].autonumeroEjercicio
}

function getValorSecuenciaRecompenza(){
    secuencias = getJSONDeLocalStore(nombreLocalStore)
    if (secuencias.length == 0) {
        secuencia = new Secuencia
        secuencias.push(secuencia)

    }
    secuencias[0].autonumeroRecompenza += 1

    setJSONDeLocalStore(nombreLocalStore, secuencias)
    return secuencias[0].autonumeroRecompenza
}

function getValorSecuenciaRecurso(){
    secuencias = getJSONDeLocalStore(nombreLocalStore)
    if (secuencias.length == 0) {
        secuencia = new Secuencia
        secuencias.push(secuencia)

    }
    secuencias[0].autonumeroRecurso += 1

    setJSONDeLocalStore(nombreLocalStore, secuencias)
    return secuencias[0].autonumeroRecurso
}

function getValorSecuenciaEvaluaciones(){
    secuencias = getJSONDeLocalStore(nombreLocalStore)
    if (secuencias.length == 0) {
        secuencia = new Secuencia
        secuencias.push(secuencia)

    }
    secuencias[0].autonumeroEvaluaciones += 1

    setJSONDeLocalStore(nombreLocalStore, secuencias)
    return secuencias[0].autonumeroEvaluaciones
}