import { useEffect, useRef } from 'react';

// Simple Line chart component using HTML Canvas
const LineChart = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Ensure canvas is properly sized
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    // Sample data - in a real app this would come from API
    const data = [15, 30, 25, 55, 45, 65, 40, 80, 75, 95, 85, 100];
    const secondData = [10, 20, 15, 35, 30, 40, 25, 45, 40, 50, 45, 60];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Chart dimensions
    const width = rect.width;
    const height = rect.height;
    const padding = 40;
    const chartWidth = width - (padding * 2);
    const chartHeight = height - (padding * 2);
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw axes
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-border').trim();
    ctx.lineWidth = 1;
    
    // Y axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();
    
    // X axis
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    // Draw grid lines
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-border-light').trim();
    ctx.lineWidth = 0.5;
    
    // Horizontal grid lines
    const yStep = chartHeight / 5;
    for (let i = 1; i <= 5; i++) {
      const y = height - padding - (yStep * i);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
      
      // Y axis labels
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary').trim();
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`${i * 20}`, padding - 5, y + 3);
    }
    
    // Draw X axis labels
    const xStep = chartWidth / (labels.length - 1);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary').trim();
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    
    labels.forEach((label, i) => {
      const x = padding + (xStep * i);
      ctx.fillText(label, x, height - padding + 15);
    });
    
    // Draw first data line
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
    const drawLine = (data: number[], color: string) => {
      const maxValue = Math.max(...data);
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      data.forEach((value, i) => {
        const x = padding + (xStep * i);
        const y = height - padding - ((value / maxValue) * chartHeight);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();
      
      // Draw data points
      data.forEach((value, i) => {
        const x = padding + (xStep * i);
        const y = height - padding - ((value / maxValue) * chartHeight);
        
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.stroke();
      });
    };
    
    // Draw first line (primary)
    drawLine(data, `rgb(${primaryColor})`);
    
    // Draw second line (secondary)
    const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-secondary').trim();
    drawLine(secondData, `rgb(${secondaryColor})`);
    
    // Draw legend
    const legendY = padding / 2;
    
    // First legend item
    ctx.fillStyle = `rgb(${primaryColor})`;
    ctx.beginPath();
    ctx.arc(padding, legendY, 4, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-text-primary').trim();
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Total Conversations', padding + 10, legendY + 4);
    
    // Second legend item
    const textWidth = ctx.measureText('Total Conversations').width;
    const secondLegendX = padding + textWidth + 30;
    
    ctx.fillStyle = `rgb(${secondaryColor})`;
    ctx.beginPath();
    ctx.arc(secondLegendX, legendY, 4, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-text-primary').trim();
    ctx.fillText('AI Resolved', secondLegendX + 10, legendY + 4);
    
  }, []);
  
  return (
    <div className="w-full h-[300px]">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full" 
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default LineChart;