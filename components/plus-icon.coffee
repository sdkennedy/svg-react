React = require "react"

D = React.DOM

PlusIcon = React.createClass

    # Spec
    # ====

    displayName: "PlusIcon"

    render: ->
        @transferPropsTo (
            D.svg
                viewBox: "0 0 17 17"
                version: "1.1"
                D.defs()
                D.g
                    stroke: "none"
                    fill: "none"
                    D.g
                        stroke: "#000000"
                        D.path
                            d: "M8.5,0.5 L8.5,16.5"
                        D.path
                            d: "M16.5,8.5 L0.5,8.5"

        )

module.exports = PlusIcon
