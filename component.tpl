React = require "react"

D = React.DOM

<%= componentName %> = React.createClass

    # Spec
    # ====

    displayName: "<%= componentName %>"

    render: ->
        @transferPropsTo (
<%= svgString %>
        )

module.exports = <%= componentName %>
