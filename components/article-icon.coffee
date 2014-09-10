React = require "react"

D = React.DOM

ArticleIcon = React.createClass

    # Spec
    # ====

    displayName: "ArticleIcon"

    render: ->
        @transferPropsTo (
            D.svg
                viewBox: "0 0 15 22"
                version: "1.1"
                D.defs()
                D.g
                    stroke: "none"
                    fill: "none"
                    D.g
                        D.path
                            d: "M12,20 L3,20 C1.95610913,20 1,19.011434 1,18 L1,3 C1,1.98856603 1.95610913,1 3,1 L12,1 C13.0438909,1 14,1.98856603 14,3 L14,18 C14,19.011434 13.0438909,20 12,20 L12,20 Z"
                            stroke: "#1A1918"
                        D.path
                            d: "M11.5,6.5 L3.5,6.5"
                            stroke: "#000000"
                        D.path
                            d: "M11.5,10.5 L3.5,10.5"
                            stroke: "#000000"
                        D.path
                            d: "M11.5,14.5 L3.5,14.5"
                            stroke: "#000000"

        )

module.exports = ArticleIcon
