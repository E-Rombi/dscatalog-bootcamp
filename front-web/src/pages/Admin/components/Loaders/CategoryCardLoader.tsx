import React from "react"
import ContentLoader from "react-content-loader"

const CategoryCardLoader = () => (
    <ContentLoader 
        speed={1}
        width="100%"
        height={630}
        backgroundColor="#ecebeb"
        foregroundColor="#d6d2d2"
    >
        <rect x="0" y="0" rx="10" ry="10" width="2000" height="70" />
        <rect x="0" y="80" rx="10" ry="10" width="2000" height="70" />
        <rect x="0" y="160" rx="10" ry="10" width="2000" height="70" />
        <rect x="0" y="240" rx="10" ry="10" width="2000" height="70" />
        <rect x="0" y="320" rx="10" ry="10" width="2000" height="70" />
        <rect x="0" y="400" rx="10" ry="10" width="2000" height="70" />
        <rect x="0" y="480" rx="10" ry="10" width="2000" height="70" />
        <rect x="0" y="560" rx="10" ry="10" width="2000" height="70" />
        

    </ContentLoader>
)

export default CategoryCardLoader;

