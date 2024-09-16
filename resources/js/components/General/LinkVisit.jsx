import React from "react"
import { Link } from "react-router-dom"

export function LinkVisit({ id }) {
    return (
        <Link to={`/visit/${id}`} className="visit">
            <i className="fa fa-calendar"></i> Schedule a visit
        </Link>
    )
}