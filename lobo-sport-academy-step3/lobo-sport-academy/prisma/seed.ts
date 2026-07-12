import { PrismaClient, UserRole, Gender, ProgramStatus, PaymentStatus, AttendanceStatus } from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.attendance.deleteMany();
  await prisma.rating.deleteMany();
  await prisma.playerCard.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.program.deleteMany();
  await prisma.student.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.coach.deleteMany();
  await prisma.parent.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();
  await prisma.cmsPage.deleteMany();
  await prisma.cmsMedia.deleteMany();
  await prisma.setting.deleteMany();

  console.log('✅ Cleared existing data');

  // Create Admin
  const adminPassword = await argon2.hash('admin123');
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@loboacademy.com',
      password: adminPassword,
      name: 'Admin User',
      phone: '+1-555-0100',
      role: UserRole.ADMIN,
      emailVerified: new Date(),
    },
  });

  await prisma.admin.create({
    data: { userId: adminUser.id },
  });

  console.log('✅ Created admin user');

  // Create Coaches
  const coachPassword = await argon2.hash('coach123');
  const coachesData = [
    { name: 'John Martinez', email: 'john@loboacademy.com', specialty: 'Football', experience: 10 },
    { name: 'Sarah Johnson', email: 'sarah@loboacademy.com', specialty: 'Basketball', experience: 8 },
    { name: 'Mike Chen', email: 'mike@loboacademy.com', specialty: 'Swimming', experience: 12 },
  ];

  const coaches = [];
  for (const coachData of coachesData) {
    const user = await prisma.user.create({
      data: {
        email: coachData.email,
        password: coachPassword,
        name: coachData.name,
        role: UserRole.COACH,
        emailVerified: new Date(),
      },
    });

    const coach = await prisma.coach.create({
      data: {
        userId: user.id,
        specialty: coachData.specialty,
        bio: `Professional ${coachData.specialty} coach with ${coachData.experience} years of experience.`,
        experience: coachData.experience,
        certifications: ['Level 1 Certified', 'First Aid'],
        hourlyRate: 50.00,
      },
    });
    coaches.push(coach);
  }

  console.log('✅ Created 3 coaches');

  // Create Parents & Students
  const parentPassword = await argon2.hash('parent123');
  const parentsData = [
    {
      name: 'Robert Wilson',
      email: 'robert@example.com',
      phone: '+1-555-0101',
      address: '123 Main St, Cityville',
      students: [
        { firstName: 'Alex', lastName: 'Wilson', dob: '2010-05-15', gender: Gender.MALE },
        { firstName: 'Emma', lastName: 'Wilson', dob: '2012-08-22', gender: Gender.FEMALE },
      ],
    },
    {
      name: 'Lisa Thompson',
      email: 'lisa@example.com',
      phone: '+1-555-0102',
      address: '456 Oak Ave, Townsburg',
      students: [
        { firstName: 'James', lastName: 'Thompson', dob: '2011-03-10', gender: Gender.MALE },
      ],
    },
    {
      name: 'David Garcia',
      email: 'david@example.com',
      phone: '+1-555-0103',
      address: '789 Pine Rd, Villageton',
      students: [
        { firstName: 'Sofia', lastName: 'Garcia', dob: '2009-11-28', gender: Gender.FEMALE },
        { firstName: 'Carlos', lastName: 'Garcia', dob: '2013-01-05', gender: Gender.MALE },
      ],
    },
  ];

  const allStudents = [];
  for (const parentData of parentsData) {
    const user = await prisma.user.create({
      data: {
        email: parentData.email,
        password: parentPassword,
        name: parentData.name,
        phone: parentData.phone,
        role: UserRole.PARENT,
        emailVerified: new Date(),
      },
    });

    const parent = await prisma.parent.create({
      data: {
        userId: user.id,
        address: parentData.address,
        emergencyContact: parentData.name,
        emergencyPhone: parentData.phone,
      },
    });

    for (const studentData of parentData.students) {
      const student = await prisma.student.create({
        data: {
          firstName: studentData.firstName,
          lastName: studentData.lastName,
          dateOfBirth: new Date(studentData.dob),
          gender: studentData.gender,
          parentId: parent.id,
        },
      });
      allStudents.push(student);
    }
  }

  console.log(`✅ Created ${parentsData.length} parents and ${allStudents.length} students`);

  // Create Programs
  const programsData = [
    {
      name: 'Youth Football Academy',
      slug: 'youth-football-academy',
      sport: 'Football',
      ageMin: 8,
      ageMax: 14,
      capacity: 30,
      price: 199.99,
      duration: 12,
      schedule: 'Mon, Wed, Fri 4:00-6:00 PM',
      location: 'Main Field',
      coachIndex: 0,
    },
    {
      name: 'Junior Basketball League',
      slug: 'junior-basketball-league',
      sport: 'Basketball',
      ageMin: 10,
      ageMax: 16,
      capacity: 25,
      price: 149.99,
      duration: 10,
      schedule: 'Tue, Thu 5:00-7:00 PM',
      location: 'Indoor Court A',
      coachIndex: 1,
    },
    {
      name: 'Swimming Fundamentals',
      slug: 'swimming-fundamentals',
      sport: 'Swimming',
      ageMin: 6,
      ageMax: 12,
      capacity: 20,
      price: 129.99,
      duration: 8,
      schedule: 'Sat, Sun 9:00-11:00 AM',
      location: 'Olympic Pool',
      coachIndex: 2,
    },
    {
      name: 'Advanced Football Training',
      slug: 'advanced-football-training',
      sport: 'Football',
      ageMin: 14,
      ageMax: 18,
      capacity: 20,
      price: 249.99,
      duration: 16,
      schedule: 'Mon-Fri 6:00-8:00 PM',
      location: 'Main Field',
      coachIndex: 0,
    },
  ];

  const programs = [];
  for (const prog of programsData) {
    const program = await prisma.program.create({
      data: {
        name: prog.name,
        slug: prog.slug,
        description: `Professional ${prog.sport} training program for ages ${prog.ageMin}-${prog.ageMax}.`,
        sport: prog.sport,
        ageGroupMin: prog.ageMin,
        ageGroupMax: prog.ageMax,
        maxCapacity: prog.capacity,
        price: prog.price,
        duration: prog.duration,
        schedule: prog.schedule,
        location: prog.location,
        coachId: coaches[prog.coachIndex]?.id,
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-05-15'),
      },
    });
    programs.push(program);
  }

  console.log(`✅ Created ${programs.length} programs`);

  // Create Enrollments
  const enrollments = [];
  for (let i = 0; i < allStudents.length; i++) {
    const student = allStudents[i];
    const program = programs[i % programs.length];

    const enrollment = await prisma.enrollment.create({
      data: {
        studentId: student.id,
        programId: program.id,
        status: 'ACTIVE',
      },
    });
    enrollments.push(enrollment);
  }

  console.log(`✅ Created ${enrollments.length} enrollments`);

  // Create Payments
  for (const enrollment of enrollments) {
    const program = programs.find(p => p.id === enrollment.programId);
    if (!program) continue;

    await prisma.payment.create({
      data: {
        amount: program.price,
        status: Math.random() > 0.3 ? PaymentStatus.PAID : PaymentStatus.PENDING,
        method: 'ONLINE',
        description: `Enrollment fee for ${program.name}`,
        dueDate: new Date('2024-01-15'),
        paidAt: Math.random() > 0.3 ? new Date('2024-01-10') : null,
        enrollmentId: enrollment.id,
        parentId: allStudents.find(s => s.id === enrollment.studentId)?.parentId || '',
      },
    });
  }

  console.log('✅ Created payments');

  // Create Attendance Records
  const today = new Date();
  for (let day = 0; day < 30; day++) {
    const date = new Date(today);
    date.setDate(date.getDate() - day);

    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;

    for (const enrollment of enrollments) {
      const status = Math.random() > 0.15 
        ? AttendanceStatus.PRESENT 
        : (Math.random() > 0.5 ? AttendanceStatus.ABSENT : AttendanceStatus.EXCUSED);

      await prisma.attendance.create({
        data: {
          date,
          status,
          studentId: enrollment.studentId,
          programId: enrollment.programId,
          coachId: programs.find(p => p.id === enrollment.programId)?.coachId,
        },
      });
    }
  }

  console.log('✅ Created attendance records');

  // Create Ratings
  const skills = ['Dribbling', 'Passing', 'Shooting', 'Speed', 'Stamina', 'Teamwork'];
  for (const student of allStudents) {
    const enrollment = enrollments.find(e => e.studentId === student.id);
    if (!enrollment) continue;

    const program = programs.find(p => p.id === enrollment.programId);
    if (!program?.coachId) continue;

    for (const skill of skills) {
      await prisma.rating.create({
        data: {
          skill,
          score: Math.floor(Math.random() * 5) + 5, // 5-10
          notes: `Good progress in ${skill.toLowerCase()}.`,
          studentId: student.id,
          coachId: program.coachId,
          programId: program.id,
        },
      });
    }
  }

  console.log('✅ Created player ratings');

  // Create CMS Pages
  await prisma.cmsPage.createMany({
    data: [
      {
        slug: 'home',
        title: 'Welcome to Lobo Sport Academy',
        content: '<h1>Welcome to Lobo Sport Academy</h1><p>Professional sports training for all ages.</p>',
        isPublished: true,
        publishedAt: new Date(),
      },
      {
        slug: 'about',
        title: 'About Us',
        content: '<h1>About Lobo Sport Academy</h1><p>We have been training champions since 2010.</p>',
        isPublished: true,
        publishedAt: new Date(),
      },
      {
        slug: 'programs',
        title: 'Our Programs',
        content: '<h1>Our Programs</h1><p>Explore our wide range of sports programs.</p>',
        isPublished: true,
        publishedAt: new Date(),
      },
    ],
  });

  console.log('✅ Created CMS pages');

  // Create Settings
  await prisma.setting.createMany({
    data: [
      { key: 'site_name', value: 'Lobo Sport Academy', category: 'general' },
      { key: 'site_logo', value: '/logo.png', category: 'general' },
      { key: 'contact_email', value: 'info@loboacademy.com', category: 'general' },
      { key: 'contact_phone', value: '+1-800-LOBO', category: 'general' },
      { key: 'currency', value: 'USD', category: 'payment' },
      { key: 'tax_rate', value: '0.08', category: 'payment' },
    ],
  });

  console.log('✅ Created settings');

  console.log('\n🎉 Seed completed successfully!');
  console.log('\n📋 Login Credentials:');
  console.log('  Admin: admin@loboacademy.com / admin123');
  console.log('  Coach: john@loboacademy.com / coach123');
  console.log('  Parent: robert@example.com / parent123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
