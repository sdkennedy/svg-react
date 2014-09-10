React = require "react"

D = React.DOM

Remove XIcon = React.createClass

    # Spec
    # ====

    displayName: "Remove XIcon"

    render: ->
        @transferPropsTo (
            D.svg
                viewBox: "0 0 20 19"
                version: "1.1"
                D.defs()
                D.g
                    stroke: "none"
                    fill: "none"
                    D.g
                        stroke: "#1A1918"
                        D.path
                            d: "M2,2 L13.228,13.228 M13.228,2 L2,13.228"

        )

module.exports = Remove XIcon
