React = require "react"

D = React.DOM

StarIcon = React.createClass

    # Spec
    # ====

    displayName: "StarIcon"

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
                        stroke: "#000000"
                        D.polygon
                            points: "9.5 13.7381153 4.50382536 17.1766444 6.23015798 11.362436 1.41601961 7.6733555 7.47912649 7.51850619 9.5 1.79999995 11.5208735 7.51850619 17.5839804 7.6733555 12.769842 11.362436 14.4961746 17.1766444 "

        )

module.exports = StarIcon
