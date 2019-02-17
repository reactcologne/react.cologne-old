import React from 'react'

import useCanvas from '@/hooks/useCanvas'

const randomIntegerInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const ease = (time, b, c, d) => {
  if ((time /= d / 2) < 1) {
    return (c / 2) * time * time + b
  }
  return (-c / 2) * (--time * (time - 2) - 1) + b
}

const Wave = ({
  points: pointsCount,
  colors,
  range: [rangeX = 50, rangeY = 30] = [],
  minDuration = 80,
  maxDuration = 200,
  heightFactor = 0.85,
  flip = false,
  width,
  height,
  debug,
  ...props
}) => {
  const canvasRef = useCanvas(
    ctx => {
      const points = []

      if (flip) {
        ctx.transform(1, 0, 0, -1, 0, height)
      }

      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)'
      ctx.shadowBlur = 20
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0

      let gradient = ctx.createLinearGradient(width / 2, 0, width / 2, height)
      for (let index = 0; index < colors.length; index++) {
        gradient.addColorStop(index, colors[index])
      }

      ctx.fillStyle = gradient

      const clear = () => {
        ctx.clearRect(0, 0, width, height)
      }

      const Point = function(config) {
        this.anchorX = config.x
        this.anchorY = config.y
        this.x = config.x
        this.y = config.y
        this.resetTarget()
      }

      Point.prototype.resetTarget = function() {
        this.initialX = this.x
        this.initialY = this.y

        this.targetX =
          this.anchorX + randomIntegerInRange(0, rangeX * 2) - rangeX

        this.targetY =
          this.anchorY + randomIntegerInRange(0, rangeY * 2) - rangeY

        this.duration = randomIntegerInRange(minDuration, maxDuration)

        this.tick = 0
      }

      Point.prototype.update = function() {
        let deltaX = this.targetX - this.x
        let deltaY = this.targetY - this.y
        let deltaVectorLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

        if (Math.abs(deltaVectorLength) === 0) {
          this.resetTarget()
        } else {
          this.y = ease(
            this.tick,
            this.initialY,
            this.targetY - this.initialY,
            this.duration
          )

          this.x = ease(
            this.tick,
            this.initialX,
            this.targetX - this.initialX,
            this.duration
          )

          this.tick++
        }
      }

      Point.prototype.render = function() {
        ctx.beginPath()
        ctx.fillStyle = 'silver'
        ctx.arc(this.initialX, this.initialY, 3, 0, Math.PI * 2, false)
        ctx.fill()

        ctx.beginPath()
        ctx.fillStyle = 'grey'
        ctx.arc(this.targetX, this.targetY, 3, 0, Math.PI * 2, false)
        ctx.fill()

        ctx.beginPath()
        ctx.fillStyle = 'red'
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false)
        ctx.fill()

        ctx.beginPath()
        ctx.fillStyle = 'green'
        ctx.arc(this.anchorX, this.anchorY, 3, 0, Math.PI * 2, false)
        ctx.fill()
      }

      const updatePoints = () => {
        let i = points.length
        while (i--) {
          points[i].update()
        }
      }

      const renderPointsDebugView = () => {
        let i = points.length
        while (i--) {
          points[i].render()
        }
      }

      const renderShape = () => {
        ctx.beginPath()
        ctx.moveTo(width, 0)
        ctx.lineTo(points[0].x, points[0].y)

        for (let i = 0; i < points.length - 1; i++) {
          let controlPointX = points[i].x
          let controlPointY = points[i].y
          let x = (controlPointX + points[i + 1].x) / 2
          let y = (controlPointY + points[i + 1].y) / 2

          ctx.quadraticCurveTo(controlPointX, controlPointY, x, y)
        }

        ctx.lineTo(0, 0)
        ctx.closePath()

        ctx.fill()
      }

      let i = pointsCount + 2
      let spacing = (width + rangeX * 2) / (pointsCount - 1)

      while (i--) {
        points.push(
          new Point({
            x: spacing * (i - 1) - rangeX,
            y: height * heightFactor,
          })
        )
      }

      return () => {
        clear()
        updatePoints()
        renderShape()
        if (debug) {
          renderPointsDebugView()
        }
      }
    },
    {
      width,
      height,
    }
  )

  return <canvas ref={canvasRef} style={{ pointerEvents: 'none' }} {...props} />
}

export default Wave
