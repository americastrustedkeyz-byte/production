request.env['atk.vehicle.report'].sudo().create({
    'user_id': request.env.user.id,
    'booking_track': report.get('track'),
    'key_type': report.get('key_type'),
    'vehicle_make': report.get('make'),
    'vehicle_model': report.get('model'),
    'vehicle_year': report.get('year'),
    'vehicle_type': report.get('vehicle_type'),
    'price': report.get('price'),
    'battery_health': report.get('battery') == 'Yes',
    'vehicle_info': report.get('vehicle_info') == 'Yes',
})
