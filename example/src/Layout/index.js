import React, {PropTypes} from 'react'

const style = {
  paddingLeft: '256px'
}

function Layout({children}) {
  return (
    <div style={style}>
      {children}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node
}

export default Layout
