React = require "react"

D = React.DOM

BookIcon = React.createClass

    # Spec
    # ====

    displayName: "BookIcon"

    render: ->
        @transferPropsTo (
            D.svg
                viewBox: "0 0 20 20"
                version: "1.1"
                D.defs()
                D.g
                    stroke: "none"
                    fill: "none"
                    D.g
                        D.g
                            transform: "translate(2.000000, 2.000000)"
                            D.path
                                d: "M0,13 L0,2 C0,0.952881356 1.00715619,0 2,0 L13,0 L13,15 L2,15 C1.00715619,15 0,14.0481356 0,13 Z"
                                stroke: "#1A1918"
                            D.path
                                d: "M2.5,0.5 L2.5,10.5"
                                stroke: "#000000"
                            D.path
                                d: "M0,13.5 C0,12.3957935 0.977207547,11.5 2,11.5 C2,11.5 10.0246058,11.5 13.4997034,11.5"
                                stroke: "#1A1918"

        )

module.exports = BookIcon
