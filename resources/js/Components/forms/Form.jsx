import React from 'react';

export function Form () {
    return (
        <form id="contact-form" action="" method="post">
            <div className="row">
                {/* Campo para el nombre completo del usuario */}
                <div className="col-lg-12">
                    <fieldset>
                    <label htmlFor="name">Nombre Completo</label>
                    <input type="text" name="name" id="name" placeholder="Tu Nombre..." autoComplete="on" required />
                    </fieldset>
                </div>
                {/* Campo para la dirección de correo electrónico */}
                <div className="col-lg-12">
                    <fieldset>
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        pattern="[^ @]*@[^ @]*"
                        placeholder="Tu Correo Electrónico..."
                        required
                    />
                    </fieldset>
                </div>
                {/* Campo para el asunto del mensaje */}
                <div className="col-lg-12">
                    <fieldset>
                    <label htmlFor="subject">Asunto</label>
                    <input type="text" name="subject" id="subject" placeholder="Asunto..." autoComplete="on" />
                    </fieldset>
                </div>
                {/* Campo para el mensaje */}
                <div className="col-lg-12">
                    <fieldset>
                    <label htmlFor="message">Mensaje</label>
                    <textarea name="message" id="message" placeholder="Tu Mensaje"></textarea>
                    </fieldset>
                </div>
                {/* Botón para enviar el formulario */}
                <div className="col-lg-12">
                    <fieldset>
                    <button type="submit" id="form-submit" className="orange-button">Enviar Mensaje</button>
                    </fieldset>
                </div>
            </div>
        </form>
    )
}
