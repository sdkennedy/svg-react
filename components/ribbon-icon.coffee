React = require "react"

D = React.DOM

RibbonIcon = React.createClass

    # Spec
    # ====

    displayName: "RibbonIcon"

    render: ->
        @transferPropsTo (
            D.svg
                viewBox: "0 0 20 25"
                version: "1.1"
                D.defs()
                D.g
                    stroke: "none"
                    fill: "none"
                    D.g
                        transform: "translate(0.000000, 0.250000)"
                        stroke: "#1A1918"
                        D.path
                            d: "M15,21 L9,16 L2,21 L2,2 L15,2 L15,21 L15,21 Z"

        )

module.exports = RibbonIcon
