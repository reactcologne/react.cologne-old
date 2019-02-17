import { useRef, useEffect } from 'react'

const useCanvas = (
  init,
  {
    context = '2d',
    width = 500,
    height = 500,
    devicePixelRatio = window.devicePixelRatio || 1,
    setup = () => {},
  } = {}
) => {
  const canvasRef = useRef(null)

  useEffect(
    () => {
      const ctx = canvasRef.current.getContext(context)
      canvasRef.current.width = width * devicePixelRatio
      canvasRef.current.height = height * devicePixelRatio
      canvasRef.current.style.width = `${width}px`
      canvasRef.current.style.height = `${height}px`
      ctx.scale(devicePixelRatio, devicePixelRatio)
      const update = init(ctx)

      let animationFrameId = requestAnimationFrame(renderFrame)

      function renderFrame() {
        animationFrameId = requestAnimationFrame(renderFrame)
        update()
      }

      return () => cancelAnimationFrame(animationFrameId)
    },
    [context, width, height]
  )

  return canvasRef
}

export default useCanvas
